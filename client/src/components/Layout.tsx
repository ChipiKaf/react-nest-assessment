import React from "react";
import "../styles/components/layout.scss";
import { Outlet } from "react-router-dom";
import Toast from "./Toast";

export default function Layout() {
  return (
    <div className="layout__container">
      <Outlet />
      <Toast />
    </div>
  );
}
