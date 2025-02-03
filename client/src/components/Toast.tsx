import React from "react";
import "../styles/components/toast.scss";
import { NotificationType } from "../types/NotificationState";
type Props = {
  color?: NotificationType;
  active: boolean;
  message: string;
};

/**
 * Simple toast component
 */
export default function Toast({ color, active, message }: Props) {
  return (
    <div className={`toast ${active ? "active" : ""} ${color || "neutral"}`}>
      {message}
    </div>
  );
}
