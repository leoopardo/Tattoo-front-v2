import { Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import Signin from "../../pages/public/signin/signin";
import { NavbarDiv, NavbarMobileDiv } from "../../styles/div.styles";
import { LoggedNavbar } from "../logged-navbar/loggedNavbar";
import { useEffect, useState } from "react";
const logo = require("../../assets/img/TattooU.png");

function Navbar() {
  const location = useLocation();

  return (
    <>
      {window.innerWidth > 750 && (
        <NavbarDiv>
          <img src={logo} alt="logo.png" style={{ width: "100%" }} />
          {location.pathname === "/" && <Signin />}

          {location.pathname === "/home" && <LoggedNavbar />}
        </NavbarDiv>
      )}
      {window.innerWidth < 750 && (
        <NavbarMobileDiv>
          <img src={logo} alt="logo.png" style={{ width: "80%" }} />
          {location.pathname === "/" && (
            <Grid
              item
              display="flex"
              alignItems="center"
              justifyContent="center"
              xs={12}
            >
              <Signin />
            </Grid>
          )}
        </NavbarMobileDiv>
      )}
    </>
  );
}

export default Navbar;
