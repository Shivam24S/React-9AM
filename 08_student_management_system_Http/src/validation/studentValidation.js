import * as yup from "yup";

const studentValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .required("First name is required."),

  lastName: yup
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .required("Last name is required."),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  phoneNumber: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number.")
    .required("Phone number is required."),

  course: yup
    .string()
    .trim()
    .required("Course is required."),
});

export default studentValidationSchema;