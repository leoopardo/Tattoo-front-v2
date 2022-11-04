import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { useState } from "react";
import { useEffect } from "react";
import { QontoConnector } from "../../../styles/text-styles";
import { Stack } from "@mui/system";
import signUpSchema from "../../../schemas/signupSchema";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { deepPurple } from "@mui/material/colors";
import toast, { Toaster } from "react-hot-toast";

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
  const navigate = useNavigate();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      profilePicture: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      role: "CLIENT",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values: any) => {
      if (activeStep !== steps.length) return;
      try {
        await api.post("/users", values);
        navigate(-1);
        toast.success("Account created");
      } catch (error: any) {
        if (error.status === 500) toast.error("E-mail already registered!");
        else toast.error("Something went wrong!");
        console.log(error);
      }
    },
  });

  function nextStep() {
    if (activeStep === steps.length) {
      formik.handleSubmit();
      return;
    }
    let step = activeStep;
    formik.handleSubmit();

    if (
      step === 0 &&
      (!formik.values.firstname ||
        !formik.values.lastname ||
        !formik.values.phoneNumber ||
        !formik.values.country)
    )
      return;

    if (step === 1 && (!formik.values.email || !formik.values.password)) return;

    ++step;
    setActiveStep(step);
  }

  function backStep() {
    let step = activeStep;
    if (activeStep === 0) navigate(-1);
    --step;
    setActiveStep(step);
  }

  const onNewProfilePicture = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const url = await api.post("/upload", formData);
      formik.setFieldValue("profilePicture", url.data.url);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

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
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{ style: { background: "#363636", color: "#fff" } }}
      />

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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ heigth: "100%" }}
        >
          <Grid>
            {activeStep === 0 && (
              <Grid
                container
                spacing={3}
                sx={{ width: "100%", marginTop: "5%" }}
              >
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "49%", marginRight: "2%", height: "53px" }}
                    required
                    id="first-name"
                    label="First name"
                    variant="filled"
                    value={formik.values.firstname}
                    name="firstname"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                  />
                  <TextField
                    sx={{ width: "49%", height: "53px" }}
                    required
                    id="last-name"
                    label="Last name"
                    variant="filled"
                    value={formik.values.lastname}
                    name="lastname"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.lastname)
                    }
                    helperText={
                      formik.touched.lastname && formik.errors.lastname
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ height: "50px" }}
                    required
                    fullWidth
                    variant="filled"
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

                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "80%", marginRight: "2%", height: "50px" }}
                    select
                    variant="filled"
                    label="Country"
                    id="country"
                    name="country"
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
                      const selectedCountry: ICountry | undefined =
                        Countries?.find((c) => c.name === e.target.value);
  
                      setStates(
                        State.getStatesOfCountry(selectedCountry?.isoCode)
                      );
                    }}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
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
                  </TextField>
                  <TextField
                    sx={{ width: "18%" }}
                    select
                    label="State"
                    id="state"
                    name="state"
                    variant="filled"
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
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="City"
                    id="city"
                    name="city"
                    variant="filled"
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
                  </TextField>
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid
                container
                spacing={1}
                sx={{ width: "100%", marginTop: "5%", heigth: "50px" }}
              >
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Role"
                    id="role"
                    name="role"
                    variant="filled"
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
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "2%",
                  }}
                >
                  <input
                    id="profile-picture"
                    type="file"
                    onChange={(e: any) =>
                      onNewProfilePicture(e.target.files[0])
                    }
                    hidden
                  />
                  <label
                    htmlFor="profile-picture"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!formik.values.profilePicture && (
                      <Avatar
                        sx={{
                          bgcolor: deepPurple[500],
                          height: "65px",
                          width: "65px",
                          fontSize: "25px",
                        }}
                      >
                        {`${formik.values.firstname[0].toUpperCase()}${formik.values.lastname[0].toUpperCase()}`}
                      </Avatar>
                    )}
                    {formik.values.profilePicture && (
                      <Avatar
                        src={formik.values.profilePicture}
                        sx={{
                          height: "80px",
                          width: "80px",
                        }}
                      />
                    )}
                    <Button>
                      Select your profile picture
                      <input id="profile-picture" type="file" hidden />
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sx={{ heigth: "50px" }}>
                  <TextField
                    required
                    id="email"
                    fullWidth
                    label="Email"
                    variant="filled"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "49%", marginRight: "2%" }}
                    type="password"
                    required
                    id="password"
                    variant="filled"
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.setFieldValue("password", e.target.value);
                      setPassword(e.target.value);
                    }}
                    label="Password"
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <TextField
                    sx={{ width: "49%" }}
                    type="password"
                    required
                    id="password"
                    variant="filled"
                    onChange={(e) => {
                      if (e.target.value !== password) {
                        formik.setFieldError(
                          "password",
                          "Passwords does't match"
                        );
                        console.log(formik.errors.password);
                      }
                    }}
                    label="Confirm Password"
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="inherit" sx={{ mr: 1 }} onClick={backStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              {activeStep === steps.length - 1 || activeStep === steps.length
                ? "Finish"
                : "Next"}
            </Button>
          </Grid>
        </Box>
      </FormControl>
    </Box>
  );
}

export default Signup;
