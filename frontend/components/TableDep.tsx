"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Resolved",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    clientName: "John Doe",
    clientContact: "+1 234 567 890",
    created: "2024-11-01",
  },
  {
    invoice: "INV002",
    paymentStatus: "Open",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    clientName: "Jane Smith",
    clientContact: "+1 234 567 891",
    created: "2024-11-05",
  },
  {
    invoice: "INV003",
    paymentStatus: "Closed",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    clientName: "Michael Johnson",
    clientContact: "+1 234 567 892",
    created: "2024-11-10",
  },
  {
    invoice: "INV004",
    paymentStatus: "Resolved",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    clientName: "Emily Davis",
    clientContact: "+1 234 567 893",
    created: "2024-11-15",
  },
  {
    invoice: "INV005",
    paymentStatus: "Resolved",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    clientName: "Chris Lee",
    clientContact: "+1 234 567 894",
    created: "2024-11-20",
  },
  {
    invoice: "INV006",
    paymentStatus: "Open",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    clientName: "Jessica Clark",
    clientContact: "+1 234 567 895",
    created: "2024-11-25",
  },
  {
    invoice: "INV007",
    paymentStatus: "Closed",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    clientName: "David Evans",
    clientContact: "+1 234 567 896",
    created: "2024-11-30",
  },
];

export function TableDep() {
  const [status, setStatus] = useState({});

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [invoiceId]: newStatus,
    }));
  };

  // Helper function to determine the status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500";
      case "Open":
        return "bg-blue-500";
      case "Closed":
        return "bg-orange-500";
      default:
        return "bg-red-700"; // Default color if status is unrecognized
    }
  };

  return (
    <div className="border border-grey-200 rounded-xl shadow-md overflow-hidden w-[90%] mx-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-4xl font-semibold p-10 text-center">
              Name
            </TableHead>
            <TableHead className="text-4xl font-semibold p-10 text-center">
              Status
            </TableHead>
            <TableHead className="text-4xl font-semibold p-10 text-center">
              Client Name
            </TableHead>
            <TableHead className="text-4xl font-semibold p-10 text-center">
              Client Contact
            </TableHead>
            <TableHead className="text-4xl font-semibold p-10 text-center">
              Created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoice}
              className="bg-grey-100 hover:bg-grey-200"
            >
              <TableCell className="text-2xl font-medium p-10 text-grey-700 text-center">
                {invoice.invoice}
              </TableCell>

              <TableCell className="text-2xl p-10 text-grey-700 text-center">
                <div className="flex justify-center items-center space-x-2">
                  {/* Status Circle */}
                  <div
                    className={`w-6 h-6 rounded-full ${getStatusColor(
                      status[invoice.invoice] || invoice.paymentStatus
                    )}`}
                  ></div>

                  {/* Status Dropdown */}
                  <select
                    value={status[invoice.invoice] || invoice.paymentStatus}
                    onChange={(e) =>
                      handleStatusChange(invoice.invoice, e.target.value)
                    }
                    className="bg-white text-black rounded-lg px-4 py-2 shadow-md w-auto text-center"
                  >
                    <option value="Resolved">Resolved</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </TableCell>

              <TableCell className="text-2xl p-10 text-grey-700 text-center">
                {invoice.clientName}
              </TableCell>
              <TableCell className="text-2xl p-10 text-grey-700 text-center">
                {invoice.clientContact}
              </TableCell>
              <TableCell className="text-2xl p-10 text-grey-700 text-center">
                {invoice.created}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
