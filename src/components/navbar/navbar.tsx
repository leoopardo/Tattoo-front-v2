import { Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SigninComponent } from "../../pages/public/signin/signin";
import { NavbarDiv, NavbarMobileDiv } from "../../styles/div.styles";
import { LoggedNavbar } from "../logged-navbar/loggedNavbar";
const logo = require("../../assets/img/TattooU.png");

function Navbar() {
  const location = useLocation();

  return (
    <>
      {window.innerWidth > 750 && (
        <NavbarDiv>
          <img src={logo} alt="logo.png" style={{ width: "100%" }} />
          {location.pathname === "/welcome" && <SigninComponent />}

          {location.pathname === "/" && <LoggedNavbar />}
        </NavbarDiv>
      )}
      {window.innerWidth < 750 && (
        <NavbarMobileDiv>
          <img src={logo} alt="logo.png" style={{ width: "80%" }} />
          {location.pathname === "/welcome" && (
            <Grid
              item
              display="flex"
              alignItems="center"
              justifyContent="center"
              xs={12}
            >
              <SigninComponent />
            </Grid>
          )}
        </NavbarMobileDiv>
      )}
    </>
  );
}

export default Navbar;
