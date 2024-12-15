"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function TableDemo() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://975b-41-229-85-253.ngrok-free.app/get_ticket_list",
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

        const tickets = await res.json();
        setData(tickets);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [ticketId]: newStatus,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-400";
      case "Open":
        return "bg-orange-400";
      case "Closed":
        return "bg-red-600";
      default:
        return "bg-grey-200";
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  function getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = String(today.getFullYear()).slice(-2); // Get last 2 digits of year

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="border border-grey-200 rounded-lg shadow-lg overflow-hidden w-[90%] mx-auto">
      <Table className="w-full bg-grey-100">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-bold p-6 text-center">
              Name
            </TableHead>
            <TableHead className="text-xl font-bold p-6 text-center">
              Status
            </TableHead>
            <TableHead className="text-xl font-bold p-6 text-center">
              Label
            </TableHead>
            <TableHead className="text-xl font-bold p-6 text-center">
              Client Name
            </TableHead>
            <TableHead className="text-xl font-bold p-6 text-center">
              Client Contact
            </TableHead>
            <TableHead className="text-xl font-bold p-6 text-center">
              Created
            </TableHead>
            <TableHead className="text-xl font-bold p-6 text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ticket) => (
            <TableRow key={ticket.ticket_id} className="hover:bg-grey-50">
              <TableCell className="text-lg p-4 text-grey-700 text-center font-medium">
                {ticket.name}
              </TableCell>

              {/* Status with Circle and Dropdown */}
              <TableCell className="text-lg p-4 text-grey-700 text-center">
                <div className="flex justify-center items-center space-x-2">
                  {/* Status Indicator */}
                  <span
                    className={`w-3 h-3 rounded-full inline-block ${getStatusColor(
                      status[ticket.ticket_id] || ticket.status
                    )}`}
                  ></span>

                  {/* Dropdown */}
                  <select
                    value={status[ticket.ticket_id] || ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket.ticket_id, e.target.value)
                    }
                    className="bg-grey-100 text-grey-700 border border-grey-300 rounded-md px-3 py-1"
                  >
                    <option value="Resolved">Resolved</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </TableCell>

              <TableCell className="text-lg p-4 text-grey-700 text-center">
                {ticket.label}
              </TableCell>
              <TableCell className="text-lg p-4 text-grey-700 text-center">
                {ticket.client_name}
              </TableCell>
              <TableCell className="text-lg p-4 text-grey-700 text-center">
                {ticket.client_contact}
              </TableCell>
              <TableCell className="text-lg p-4 text-grey-700 text-center">
                {/* {ticket.created} */}
                {getTodayDate()}
              </TableCell>

              {/* View Details Button */}
              <TableCell className="text-lg p-4 text-right">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => router.push(`/allTickets/${ticket.ticket_id}`)}
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
