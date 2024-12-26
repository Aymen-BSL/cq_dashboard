"use client";

import { useEffect, useState } from "react";
import { TableDemo } from "@/components/TableDemo";

export default function AllTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllTickets = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://975b-41-229-85-253.ngrok-free.app/get_ticket_list?all=1",
          {
            method: "GET",
            headers: {
              token: token,
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tickets.");
        }

        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Unable to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTickets();
  }, []);

  if (loading)
    return <div className="text-center p-6 text-grey-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Horizontally center
        alignItems: "center", // Vertically center
        height: "100vh", // Full viewport height
      }}
    >
      <TableDemo tickets={tickets} />
    </div>
  );
}
