import React from "react";
import "../styles/components/buttons.scss";
type Props = {
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
};

export default function Button({ type, children }: Props) {
  return (
    <button className="btn" type={type}>
      {children}
    </button>
  );
}
