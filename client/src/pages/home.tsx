import React, { useCallback } from "react";
import "../styles/pages/home.scss";
import Button from "../components/Button";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutThunk } from "../store/user/user.thunks";

/**
 * Home page for authenticated users
 */
export default function Home() {
  const dispatch = useAppDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, []);
  return (
    <div className="home__container">
      <div className="home__section">
        <div className="home__text">Welcome to the application</div>
        <div className="line"></div>
      </div>
      <Button
        classes="show-delay"
        type="button"
        outline={true}
        background="black"
        ariaLabel="Log out button"
        onClick={onLogout}
      >
        Log out
      </Button>
    </div>
  );
}
