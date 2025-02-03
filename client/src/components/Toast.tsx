import React from "react";
import "../styles/components/toast.scss";
type Props = {
  color?: "success" | "warn" | "danger" | "neutral";
};

export default function Toast({ color }: Props) {
  return (
    <div className={`toast ${color || "neutral"}`}>This is a toast message</div>
  );
}
