from flask import Flask, request, jsonify, make_response, render_template, g
from datetime import datetime, timedelta
from openai import AzureOpenAI
import json
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt
from jwt import encode, decode
from app.utils import get_create_ticket_prompt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Flask and SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')

db = SQLAlchemy(app)


from app.models import Agent, Ticket, Department


load_dotenv()
client = AzureOpenAI(azure_endpoint=os.getenv("ENDPOINT"),
                     api_key=os.getenv("API_KEY"),
                     api_version="2024-08-01-preview")

def generate_token(agent_id):
    return encode({"agent_id": agent_id, "exp": datetime.utcnow() + timedelta(hours=24)}, 
                  app.config['SECRET_KEY'], algorithm="HS256")

def decode_token(token):
    try:
        return decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except:
        return None

def authenticate():
    token = request.headers.get('token')
    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    decoded = decode_token(token)
    if not decoded:
        return jsonify({"error": "Unauthorized"}), 401

    agent = Agent.query.filter_by(agent_id=decoded['agent_id']).first()
    if not agent:
        return jsonify({"error": "Agent not found"}), 404

    g.agent = agent
    return None

def get_label_name(label):
        department = Department.query.filter_by(department_id=label).first()
        return department.name if department else None

@app.route('/', methods=['POST'])
def hello_world():
    email = request.get_json()
    email_address = email['headers']['from'].split('<')[1].split('>')[0]
    subject = email['headers']['subject']
    content = email['plain']

    print(email_address, subject, content)

    department_names = [f"{d.name}:{d.department_id}" for d in Department.query.all()]

    response = client.chat.completions.create(model="gpt-4o-mini",
                                          temperature=.2,
                                          messages=[
                                              {"role": "system", "content": "You are a helpful assistant."},
                                              {"role": "user", "content": get_create_ticket_prompt(subject, content, email_address, department_names)
                                               },],
                                          max_tokens=2000)
    
    ticket_data = json.loads(response.choices[0].message.content)
    
    ticket_id = f"ticket-{datetime.utcnow().timestamp()}"
    ticket = Ticket(ticket_id=ticket_id, **ticket_data, status="open", client_contact=email_address)
    db.session.add(ticket)
    db.session.commit()
    
    return 'ok'


@app.route('/sign_up', methods=['POST'])
def sign_up():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']
    department_id = data['department_id']

    if Agent.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password, method='scrypt')
    agent_id = f"agent-{datetime.utcnow().timestamp()}"
    new_agent = Agent(agent_id=agent_id, name=name, email=email, password_hash=hashed_password, department_id=department_id)
    db.session.add(new_agent)
    db.session.commit()

    token = generate_token(agent_id)
    response = make_response({"message": "Sign-up successful", "token": token})
    response.set_cookie('token', token)
    return response

@app.route('/sign_in', methods=['POST'])
def sign_in():
    data = request.get_json()
    email = data['email']
    password = data['password']

    agent = Agent.query.filter_by(email=email).first()
    if not agent or not check_password_hash(agent.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = generate_token(agent.agent_id)
    response = make_response({"message": "Sign-in successful", "token": token})
    response.set_cookie('token', token)
    return response

@app.route('/analytics', methods=['GET'])
def analytics():
    auth_error = authenticate()
    if auth_error:
        return auth_error

    agent = g.agent
    department_id = agent.department_id

    open_tickets = Ticket.query.filter_by(status='open').count()
    closed_tickets = Ticket.query.filter_by(status='closed').count()
    assigned_tickets = Ticket.query.filter_by(assigned_to=agent.agent_id).count()
    resolved_tickets = Ticket.query.filter_by(status='resolved').count()

    return jsonify({"open_tickets": open_tickets, "closed_tickets": closed_tickets, "assigned_tickets": assigned_tickets, "resolved_tickets": resolved_tickets})


@app.route('/get_ticket_list', methods=['GET'])
def get_ticket_list():
    auth_error = authenticate()
    if auth_error:
        return auth_error

    agent = g.agent
    department_id = agent.department_id
    all_tickets = request.args.get('all')
    
    status_filter = request.args.get('status')

    if all_tickets:
        tickets = Ticket.query.all()
    else:
        tickets = Ticket.query.filter_by(assigned_to=agent.agent_id).all()

    
    return jsonify([{ "ticket_id": t.ticket_id, "name": t.name, "status": t.status, "client_name": t.client_name, "client_contact": t.client_contact, "ts": t.ts, "label": get_label_name(t.label) } for t in tickets])

@app.route('/get_ticket/<ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    auth_error = authenticate()
    if auth_error:
        return auth_error

    ticket = Ticket.query.filter_by(ticket_id=ticket_id).first()
    if not ticket:
        return jsonify({"error": "Ticket not found"}), 404
    
    agent_assigned_name = Agent.query.filter_by(agent_id=ticket.assigned_to).first().name if ticket.assigned_to else None

    return jsonify({"ticket_id": ticket.ticket_id, "name": ticket.name, "description": ticket.description, 
                    "status": ticket.status, "client_name": ticket.client_name, "client_contact": ticket.client_contact, "assigned_to": agent_assigned_name, "label": get_label_name(ticket.label)})

@app.route('/change_ticket_status', methods=['POST'])
def change_ticket_status():
    auth_error = authenticate()
    if auth_error:
        return auth_error

    data = request.get_json()
    ticket_id = data['ticket_id']
    new_status = data['status']

    ticket = Ticket.query.filter_by(ticket_id=ticket_id).first()
    if not ticket:
        return jsonify({"error": "Ticket not found"}), 404

    ticket.status = new_status
    db.session.commit()
    return jsonify({"message": "Ticket status updated"})

@app.route('/change_assignment', methods=['POST'])
def change_assignment():
    auth_error = authenticate()
    if auth_error:
        return auth_error

    agent = g.agent
    data = request.get_json()
    ticket_id = data['ticket_id']

    ticket = Ticket.query.filter_by(ticket_id=ticket_id).first()
    if not ticket:
        return jsonify({"error": "Ticket not found"}), 404

    if ticket.assigned_to:
        return jsonify({"message": "Ticket already assigned"})

    ticket.assigned_to = agent.agent_id
    db.session.commit()
    return jsonify({"message": "Ticket assignment updated"})


if __name__ == '__main__':
    app.run(debug=True)
