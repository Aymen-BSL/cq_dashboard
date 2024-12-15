import React from "react";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}

export default function Heading({
  as = "h1",
  children,
}: HeadingProps): React.ReactElement {
  const Tag = as; // Dynamic HTML tag based on the `as` prop
  const classes = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-2xl font-medium",
    h4: "text-3xl font-bold text-center",
  };

  return <Tag className={classes[as]}>{children}</Tag>;
}
