"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

async function fetchTicketDetails(id: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const res = await fetch(
    `https://975b-41-229-85-253.ngrok-free.app/get_ticket/${id}`,
    {
      method: "GET",
      headers: {
        token: token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ticket details.");
  }

  return res.json();
}

export default function TicketDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [ticket, setTicket] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Ticket ID is missing.");
      setLoading(false);
      return;
    }

    fetchTicketDetails(id)
      .then((data) => setTicket(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="text-center p-6 text-grey-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!ticket) {
    return <div className="text-center p-6">No ticket details available.</div>;
  }

  function getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = String(today.getFullYear()).slice(-2); // Get last 2 digits of year

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-grey-100 rounded-lg shadow-lg border border-grey-300">
      <h1 className="text-4xl font-bold text-grey-700 mb-6">Ticket Details</h1>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {/* <p className="text-lg text-grey-700">
            <strong className="font-semibold">Name:</strong>{ticket.name}
          </p> */}
          <span
            className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
              ticket.status === "Resolved"
                ? "bg-green-500"
                : ticket.status === "Open"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {ticket.status}
          </span>
        </div>
        <p className="text-lg text-grey-700">
          <strong className="font-semibold">Label:</strong> {ticket.label}
        </p>
        <p className="text-lg text-grey-700">
          <strong className="font-semibold">Client Name:</strong>{" "}
          {ticket.client_name}
        </p>
        <p className="text-lg text-grey-700">
          <strong className="font-semibold">Client Contact:</strong>{" "}
          {ticket.client_contact}
        </p>
        <p className="text-lg text-grey-700">
          <strong className="font-semibold">Created:</strong> {getTodayDate()}
        </p>
        <p className="text-lg text-grey-700">
          <strong className="font-semibold">Description:</strong>{" "}
          {ticket.description || "No description provided."}
        </p>
      </div>

      {/* Call-to-action or Back Button */}
      <div className="mt-8">
        <button
          onClick={() => history.back()}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
