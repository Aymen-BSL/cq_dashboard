"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://975b-41-229-85-253.ngrok-free.app/sign_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        const data = await res.json();

        // Store the token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to the dashboard
        router.push("/");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Sign-In Error:", err);
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-grey-0">
      <form
        onSubmit={handleSignIn}
        className="bg-grey-100 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold mb-6 text-grey-700">Sign In</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-xl font-medium mb-2 text-grey-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-xl font-medium mb-2 text-grey-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
