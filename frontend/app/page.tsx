"use client";

import { useEffect, useState } from "react";

type Analytics = {
  assigned_tickets: number;
  closed_tickets: number;
  open_tickets: number;
  resolved_tickets: number;
};

async function fetchAnalyticsData(token: string): Promise<Analytics> {
  const res = await fetch(
    "https://975b-41-229-85-253.ngrok-free.app/analytics",
    {
      method: "GET",
      headers: {
        token: `${token}`,
      },
      cache: "no-store", // Always fetch fresh data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch analytics data");
  }

  return res.json();
}

export default function Page() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      setLoading(false);
      return;
    }

    fetchAnalyticsData(token)
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-6 text-grey-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-[auto,34rem,auto] gap-6 p-6">
      {/* Stats Section */}
      <div className="col-span-4 grid grid-cols-4 gap-4">
        <div className="bg-grey-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-grey-400">Assigned Tickets</h3>
          <p className="text-2xl font-semibold text-grey-700">
            {analytics?.assigned_tickets}
          </p>
        </div>
        <div className="bg-grey-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-grey-400">Open Tickets</h3>
          <p className="text-2xl font-semibold text-grey-700">
            {analytics?.open_tickets}
          </p>
        </div>
        <div className="bg-grey-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-grey-400">Closed Tickets</h3>
          <p className="text-2xl font-semibold text-grey-700">
            {analytics?.closed_tickets}
          </p>
        </div>
        <div className="bg-grey-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-grey-400">Resolved Tickets</h3>
          <p className="text-2xl font-semibold text-grey-700">
            {analytics?.resolved_tickets}
          </p>
        </div>
      </div>

      {/* Today Activity Section */}
      <div className="col-span-2 bg-grey-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-grey-400">
          Today’s Activity
        </h2>
        <p className="text-grey-700">
          {analytics?.open_tickets > 0
            ? `There are ${analytics?.open_tickets} tickets open today.`
            : "No activity data available."}
        </p>
      </div>

      {/* Duration Chart Section */}
      <div className="col-span-2 bg-grey-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-grey-400">Duration Chart</h2>
        <p className="text-grey-700">
          A placeholder for the duration chart visualization.
        </p>
      </div>

      {/* Sales Chart Section */}
      <div className="col-span-4 bg-grey-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-grey-400">Sales Chart</h2>
        <p className="text-grey-700">
          A placeholder for the sales chart visualization.
        </p>
      </div>
    </div>
  );
}
