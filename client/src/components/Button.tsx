import React from "react";
import "../styles/components/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
type Props = {
  type: "submit" | "reset" | "button" | undefined;
  outline?: boolean;
  animate?: boolean;
  background?: "primary" | "black" | "transparent";
  isLoading?: boolean;
  classes?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  type,
  onClick,
  background,
  animate,
  outline,
  isLoading,
  ariaLabel,
  classes,
  children,
}: Props) {
  return (
    <button
      className={`btn ${background || "primary"} ${animate ? "animate" : ""} ${
        outline ? "outline" : ""
      } ${classes || ""}`}
      type={type}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <div
        className={`text ${!isLoading ? "active" : ""}
        }`}
      >
        {children}
      </div>
      {animate && (
        <div
          className={`loader ${isLoading ? "active" : ""}`}
          aria-live="polite"
        >
          <FontAwesomeIcon icon={faCircleNotch} spin size="1x" />
        </div>
      )}
    </button>
  );
}
