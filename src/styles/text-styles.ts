import {
  TextField,
  styled as StryledMui,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import styled from "styled-components";

export const TattooU = styled.ol`
  color: white;
`;

export const Input = StryledMui(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    color: "white",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#2c2d2e70",
    fontSize: 16,
    FontWeigth: 600,
    color: "black",
    padding: "10px 29px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      color: "white",
      borderRadius: 4,
      border: 0,
      filter: "blur(100%)",
      boxShadow: "white",
      backgroundColor: "#393e46",
    },
  },
}));
export const Select = StryledMui(SelectInput)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    color: "white",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#C0C8D6",
    fontSize: 16,
    FontWeigth: 600,
    color: "black",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      color: "white",
      borderRadius: 4,
      border: 0,
      filter: "blur(100%)",
      boxShadow: "white",
      backgroundColor: "#393e46",
    },
  },
}));


export const QontoConnector = StryledMui(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
