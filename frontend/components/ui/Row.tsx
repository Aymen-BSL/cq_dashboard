import { ReactNode } from "react";

interface RowProps {
  type?: "horizontal" | "vertical";
  children: ReactNode;
}

export default function Row({ type = "vertical", children }: RowProps) {
  return (
    <div
      className={`flex ${
        type === "horizontal"
          ? "justify-between items-center"
          : "flex-col gap-4"
      }`}
    >
      {children}
    </div>
  );
}
