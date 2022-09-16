import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import { ColorButton } from "../signin/signin";

function Signup() {
  return (
    <Box
      sx={{
        width: "70%",
        height: "90%",
        margin: "2%",
        borderRadius: "1%",
        backgroundColor: "#e1e5ebfa",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontWeight: "1000" }}>Sign Up</h2>
      <FormControl>
        <Grid>
          <TextField required id="outlined-required" label="First name" />
          <TextField required id="outlined-required" label="Last Name" />
        </Grid>
        <Grid>
          <TextField type="email" required id="outlined-required" label="Email" />
        </Grid>
        <Grid>
          <TextField required id="outlined-required" label="Country" />
          <TextField required id="outlined-required" label="State" />
          <TextField required id="outlined-required" label="City" />
        </Grid>
        <Grid>
          <TextField select required id="outlined-required" label="Role">
            <MenuItem value={10}>Artist</MenuItem>
            <MenuItem value={20}>Client</MenuItem>
          </TextField>
        </Grid>
        <Grid>
          <TextField type="password" required id="outlined-required" label="Password" />
        </Grid>
        <ColorButton> Sign Up </ColorButton>
      </FormControl>
    </Box>
  );
}

export default Signup;
