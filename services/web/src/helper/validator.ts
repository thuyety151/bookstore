import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const ruleEmail = (values: string) => {
  if (!values) {
    return "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
    return "Invalid email address";
  }
};
// const validationSchema = yup.object({
//   email: yup
//     .string("Enter your email")
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string("Enter your password")
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });
export const validator = () => {
  const required = () => {
    return (value: any) => {
      console.log("validator", value);
      if (!value) {
        return "Yêu cầu không được để trống";
      }
    };
  };
  return {
    required,
  };
};
