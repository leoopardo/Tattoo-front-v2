import {
  Box,
  Button,
  ButtonProps,
  FormControl,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../../contexts/Auth";
import Signup from "../signup/signup";

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#171b22",
  "&:hover": {
    backgroundColor: "#0b0e13",
  },
}));

export const SigninComponent = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    onSubmit: async (values) => {
      try {
        console.log(user);
        signIn(values);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      style={{
        backgroundColor: "white",
        borderRadius: "2%",
        marginTop: "15%",
        textAlign: "center",
        width: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormControl>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid>
            <h3>Sign in</h3>
          </Grid>
          <Grid xs={12}>
            <TextField
              name="email"
              sx={{ marginTop: "4px", width: "80%" }}
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              id="outlined-required"
              label="Email"
            />
            <TextField
              type="password"
              name="password"
              sx={{ marginTop: "12px", width: "80%" }}
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              id="outlined-required"
              label="Password"
            />
          </Grid>

          <Grid xs={12}>
            <ColorButton
              type="submit"
              variant="contained"
              sx={{ marginTop: "12px", marginBottom: "10%" }}
            >
              Sign in
            </ColorButton>
          </Grid>
          <Button
            sx={{ width: "100%" }}
            variant="text"
            color="error"
            onClickCapture={() => navigate("/signup")}
          >
            I don't have an account
          </Button>
        </Grid>
      </FormControl>
    </Box>
  );
};
