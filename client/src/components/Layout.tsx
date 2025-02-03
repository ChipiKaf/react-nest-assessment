import React, { useEffect, useRef } from "react";
import "../styles/components/layout.scss";
import { Outlet } from "react-router-dom";
import Toast from "./Toast";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { config } from "../config/config";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearNotification } from "../store/notification/notification.slice";

export default function Layout() {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useAppDispatch();
  const currentTimeout = useRef<number | null>(null);

  /**
   * Clear notification after time period
   */
  useEffect(() => {
    if (currentTimeout.current) clearTimeout(currentTimeout.current);
    currentTimeout.current = setTimeout(() => {
      dispatch(clearNotification());
    }, config.toastTimeout);
  }, [dispatch, notification]);

  return (
    <div className="layout__container">
      <Outlet />
      <Toast
        active={!!notification.message && !!notification.type}
        color={notification.type}
        message={notification.message || ""}
      />
    </div>
  );
}
