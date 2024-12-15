

def get_create_ticket_prompt(subject, contents, email_address, departments):
    departments = ', '.join(departments)
    return f'''Based on the email contents bellow, please create a ticket as a json object like this:
{{
    "name": "Ticket Name",
    "description": "Ticket Description",
    "label": "What department_id should handle this ticket [departments: {departments}]. Just one the id (number)",
    "client_name": "Client Name [You can derive this from the email address]",
}}

Email Address: {email_address}
Subject: {subject}
Contents: {contents}


Rules:
- Only output the json object, nothing else. No need for ```
- Create a descriptive title and description based on the email contents and subject.
'''