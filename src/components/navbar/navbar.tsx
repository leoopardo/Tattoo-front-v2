import { useLocation } from "react-router-dom";
import Signin from "../../pages/public/signin/signin";
import { NavbarDiv } from "../../styles/div.styles";
const logo = require("../../assets/img/TattooU.png");

function Navbar() {
  const location = useLocation();

  return (
    <NavbarDiv>
      <img src={logo} alt="logo.png" style={{ width: "100%" }} />
      {location.pathname === "/" && <Signin />}
    </NavbarDiv>
  );
}

export default Navbar;
