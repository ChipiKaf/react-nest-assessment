import React from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormRegister,
  DefaultValues,
  Path,
  Resolver,
  FieldError,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField } from "../types/Form";
import "../styles/components/form.scss";
import Button from "./Button";

interface FormProps<T extends FieldValues> {
  fields: FormField[];
  schema: yup.ObjectSchema<T>;
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
}

/**
 * A reusable form component
 */
export default function Form<T extends FieldValues>({
  fields,
  schema,
  onSubmit,
  defaultValues,
}: FormProps<T>) {
  const resolver = yupResolver(schema) as unknown as Resolver<T>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const renderField = (field: FormField, register: UseFormRegister<T>) => {
    const fieldName = field.name as Path<T>;
    return (
      <div className="form__group" key={field.name}>
        <label className="form__label" htmlFor={field.name}>
          {field.label}
        </label>
        <input
          id={field.name}
          className="form__input"
          type={field.type}
          placeholder={field.placeholder}
          {...register(fieldName)}
        />
        {errors[fieldName] && (
          <p style={{ color: "red" }}>
            {(errors[fieldName] as FieldError)?.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit as SubmitHandler<T>)}
    >
      {fields.map((field) => renderField(field, register))}
      <Button type="submit">Submit</Button>
    </form>
  );
}
