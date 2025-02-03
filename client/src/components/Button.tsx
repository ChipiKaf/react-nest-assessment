import React from "react";
import "../styles/components/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
type Props = {
  type: "submit" | "reset" | "button" | undefined;
  outline?: boolean;
  animate?: boolean;
  background?: "primary" | "transparent";
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  type,
  onClick,
  background,
  animate,
  isLoading,
  children,
}: Props) {
  return (
    <button
      className={`btn ${background || "primary"} ${animate ? "animate" : ""}`}
      type={type}
      onClick={onClick}
    >
      <div
        className={`text ${!isLoading ? "active" : ""}
        }`}
      >
        {children}
      </div>
      {animate && (
        <div className={`loader ${isLoading ? "active" : ""}`}>
          <FontAwesomeIcon icon={faCircleNotch} spin size="1x" />
        </div>
      )}
    </button>
  );
}
