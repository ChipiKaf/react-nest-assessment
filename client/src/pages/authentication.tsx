import React from "react";
import "../styles/pages/auth.scss";
import * as yup from "yup";
import Card from "../components/Card";
import Form from "../components/Form";
import { FormField } from "../types/Form";

interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
}

const fields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const signUpFormSchema: yup.ObjectSchema<SignUpFormValues> = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(96, "Name cannot exceed 96 characters")
      .required("Name is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  })
  .required();

export default function authentication() {
  const handleFormSubmit = (data: SignUpFormValues) => {
    console.log("Submitted Data:", data);
  };
  return (
    <div className="auth__container">
      <Card title="Login">
        <Form<SignUpFormValues>
          fields={fields}
          schema={signUpFormSchema}
          onSubmit={handleFormSubmit}
        />
      </Card>
    </div>
  );
}
