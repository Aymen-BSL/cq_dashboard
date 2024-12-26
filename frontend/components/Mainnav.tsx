"use client"; // Required for usePathname in Next.js App Router

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconSettings, IconUserBolt } from "@tabler/icons-react";
import { LuTicketSlash } from "react-icons/lu";
import { clsx } from "clsx"; // Utility for conditional class handling

export default function MainNav() {
  const pathname = usePathname(); // Get the current route path

  return (
    <nav className="flex flex-col gap-6">
      {/* Home */}
      <Link
        href="/"
        className={clsx(
          "flex items-center gap-4 p-2 py-4 rounded-md text-grey-700 hover:text-grey-900 font-semibold hover:bg-grey-100",
          pathname === "/" && "bg-grey-0 text-white"
        )}
      >
        <IconUserBolt size={20} />
        Home
      </Link>

      {/* All Tickets */}
      <Link
        href="/allTickets"
        className={clsx(
          "flex items-center gap-4 p-2 py-4 rounded-md text-grey-700 hover:text-grey-900 hover:bg-grey-100",
          pathname === "/allTickets" && "bg-grey-0 text-white"
        )}
      >
        <LuTicketSlash size={20} />
        All Tickets
      </Link>

      {/* Our Tickets */}
      <Link
        href="/departTickets"
        className={clsx(
          "flex items-center gap-4 p-2 py-4 rounded-md text-grey-700 hover:text-grey-900 hover:bg-grey-100",
          pathname === "/departTickets" && "bg-grey-0 text-white"
        )}
      >
        <LuTicketSlash size={20} />
        Our Tickets
      </Link>

      <Link
        href="/sign-in"
        className={clsx(
          "mt-4 flex items-center gap-4 p-2 py-4 rounded-md text-grey-700 hover:text-grey-900 hover:bg-grey-100 bg-blue-500",
          pathname === "/departTickets" && "bg-grey-0 text-white"
        )}
      >
        <IconUserBolt size={20} />
        Sign in
      </Link>
    </nav>
  );
}
