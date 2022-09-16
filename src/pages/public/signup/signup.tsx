import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useFormik } from "formik";
import { ColorButton } from "../signin/signin";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { useState } from "react";
import { useEffect } from "react";
import { Input, QontoConnector } from "../../../styles/text-styles";
import { Stack } from "@mui/system";

function Signup() {
  const [Countries, setCountries] = useState<ICountry[]>();
  const [States, setStates] = useState<IState[]>();
  const [Cities, setCities] = useState<ICity[]>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const steps = [
    "Personal settings",
    "Account Settings",
    "Create your Account",
  ];

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  function nextStep() {
    let step = activeStep;
    ++step;
    if (step === 3) {
      //Aqui vai o submit do formulário

      return;
    }
    setActiveStep(step);
  }

  function backStep() {
    let step = activeStep;
    --step;
    setActiveStep(step);
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      role: "CLIENT",
      email: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: async (values: any) => {},
  });

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
      <Stack sx={{ width: "100%", marginTop: "3%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <FormControl sx={{ width: "70%" }}>
        {activeStep === 0 && (
          <Grid sx={{ width: "100%", marginTop: "10%" }}>
            <Grid>
              <Input
                sx={{ width: "49%", marginRight: "2%" }}
                required
                id="first-name"
                label="First name"
                value={formik.values.firstname}
                name="firstname"
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
              <Input
                sx={{ width: "49%" }}
                required
                id="last-name"
                label="Last name"
                value={formik.values.lastname}
                name="lastname"
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
            <Grid>
              <Input
                sx={{ marginTop: "2%" }}
                required
                fullWidth
                type="number"
                id="phone-number"
                label="Phone Number"
                value={formik.values.phoneNumber}
                name="phoneNumber"
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>

            <Grid sx={{ marginTop: "3%" }}>
              <Input
                sx={{ width: "80%", marginRight: "2%" }}
                select
                label="Country"
                id="country"
                name="country"
                variant="outlined"
                fullWidth
                required
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: "35%" },
                  },
                }}
                value={formik.values.country}
                onChange={(e) => {
                  formik.setFieldValue("country", e.target.value);
                  const selectedCountry: ICountry | undefined = Countries?.find(
                    (c) => c.name === e.target.value
                  );
                  console.log(selectedCountry);
                  setStates(State.getStatesOfCountry(selectedCountry?.isoCode));
                }}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Countries?.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Input>
              <Input
                sx={{ width: "18%" }}
                select
                label="State"
                id="state"
                name="state"
                variant="outlined"
                fullWidth
                required
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: "35%" },
                  },
                }}
                value={formik.values.state}
                onChange={(e) => {
                  formik.setFieldValue("state", e.target.value);
                  const selectedCountry: any = Countries?.find(
                    (c) => c.name === formik.values.country
                  );
                  const selectedState: any = States?.find(
                    (s) => s.name === e.target.value
                  );
                  console.log(selectedState);
                  setCities(
                    City.getCitiesOfState(
                      selectedCountry?.isoCode,
                      selectedState?.isoCode
                    )
                  );
                }}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {States?.map((s) => (
                  <MenuItem key={s.name} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </Input>
            </Grid>
            <Grid sx={{ marginTop: "3%" }}>
              <Input
                select
                label="City"
                id="city"
                name="city"
                variant="outlined"
                fullWidth
                required
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: "35%" },
                  },
                }}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Cities?.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Input>
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid sx={{ width: "100%", marginTop: "10%" }}>
            <Grid>
              <Input
                select
                label="Role"
                id="role"
                name="role"
                variant="outlined"
                fullWidth
                required
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="CLIENT">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"CLIENT"} key="CLIENT">
                  Client
                </MenuItem>
                <MenuItem value={"ARTIST"} key="ARTIST">
                  Artist
                </MenuItem>
              </Input>
            </Grid>
            <Grid sx={{ marginTop: "3%" }}>
              <Input
                required
                id="email"
                fullWidth
                label="Email"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid sx={{ marginTop: "1%" }}>
              <Input
                sx={{ width: "49%", marginRight: "2%" }}
                type="password"
                required
                id="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                  setPassword(e.target.value);
                }}
                label="Password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Input
                sx={{ width: "49%" }}
                type="password"
                required
                id="password"
                onChange={(e) => {
                  if (e.target.value !== password) {
                    formik.setFieldError("password", "Passwords does't match");
                    console.log(formik.errors.password);
                  }
                }}
                label="Confirm Password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
        )}
        <Grid>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            sx={{ mr: 1 }}
            onClick={backStep}
          >
            Back
          </Button>
          <Button onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </FormControl>
    </Box>
  );
}

export default Signup;
