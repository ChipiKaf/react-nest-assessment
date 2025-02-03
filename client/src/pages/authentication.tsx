import React, { useCallback, useEffect, useState } from "react";
import "../styles/pages/auth.scss";
import * as yup from "yup";
import Card from "../components/Card";
import Form from "../components/Form";
import { FormField } from "../types/Form";
import Button from "../components/Button";
import { FormErrors } from "../constants/errors.enum";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loginThunk, signUpThunk } from "../store/user/user.thunks";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const loginFields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const signUpFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
  },
  ...loginFields,
];

const loginFormSchema: yup.ObjectSchema<LoginFormValues> = yup
  .object({
    email: yup
      .string()
      .email(FormErrors.INVALID_EMAIL)
      .required(FormErrors.EMAIL_REQUIRED),
    password: yup.string().required(FormErrors.PASSWORD_REQUIRED),
  })
  .required();

const signUpFormSchema: yup.ObjectSchema<SignUpFormValues> = yup
  .object({
    email: yup
      .string()
      .email(FormErrors.INVALID_EMAIL)
      .required(FormErrors.EMAIL_REQUIRED),
    name: yup
      .string()
      .min(3, FormErrors.NAME_MIN_LENGTH)
      .max(96, FormErrors.NAME_MAX_LENGTH)
      .required(FormErrors.NAME_REQUIRED),
    password: yup
      .string()
      .min(8, FormErrors.PASSWORD_LENGTH)
      .required(FormErrors.PASSWORD_REQUIRED),
  })
  .required();

/**
 * Page to handle signup and sign in
 */
export default function Authentication() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.isAuthenticated) navigate("/");
  }, [user]);
  const handleSignupFormSubmit = (data: SignUpFormValues) => {
    dispatch(
      signUpThunk({
        email: data.email,
        password: data.password,
        name: data.name,
      })
    );
  };

  const handleLoginFormSubmit = (data: LoginFormValues) => {
    dispatch(loginThunk({ email: data.email, password: data.password }));
  };

  const onClick = useCallback(() => {
    setIsSignUp((prev) => !prev);
  }, []);

  return (
    <div className="auth__container">
      <Card
        title={isSignUp ? "Sign up" : "Login"}
        footer={
          <div className="auth__footer">
            <div className="footer-text">
              {isSignUp
                ? "Already have an account?"
                : "Don't yet have an account?"}
            </div>
            <Button
              type="button"
              background="transparent"
              onClick={onClick}
              ariaLabel="Switch between login and sign up button"
            >
              {isSignUp ? "Login" : "Sign up"}
            </Button>
          </div>
        }
      >
        {isSignUp ? (
          <Form<SignUpFormValues>
            isLoading={user.loading}
            fields={signUpFields}
            schema={signUpFormSchema}
            onSubmit={handleSignupFormSubmit}
          />
        ) : (
          <Form<LoginFormValues>
            isLoading={user.loading}
            fields={loginFields}
            schema={loginFormSchema}
            onSubmit={handleLoginFormSubmit}
          />
        )}
      </Card>
    </div>
  );
}
