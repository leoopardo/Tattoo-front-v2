import * as yup from "yup";

const signUpSchema: any = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  state: yup.string(),
  city: yup.string(),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default signUpSchema;
