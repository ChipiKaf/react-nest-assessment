import React from "react";
import "../styles/components/card.scss";

type Props = {
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Card({ title, children, footer }: Props) {
  return (
    <div className="card">
      <div className="card__header">{title}</div>
      <div className="card__body">{children}</div>
      <div className="card__footer">{footer}</div>
    </div>
  );
}
