import {
  Button,
  ButtonProps,
  FormControl,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#171b22",
  "&:hover": {
    backgroundColor: "#0b0e13",
  },
}));

function Signin() {
  const navigate = useNavigate();
  return (
    <FormControl
      style={{
        backgroundColor: "white",
        borderRadius: "2%",
        marginTop: "3%",
        textAlign: "center",
        width: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        <TextField
          sx={{ marginTop: "3%", width: "80%" }}
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          sx={{ marginTop: "3%", width: "80%" }}
          required
          id="outlined-required"
          label="Password"
        />
        <ColorButton
          variant="contained"
          sx={{ marginTop: "3%", marginBottom: "10%" }}
        >
          Sign in
        </ColorButton>
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
  );
}

export default Signin;
