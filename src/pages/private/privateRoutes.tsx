import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileLoggedNavbar } from "../../components/logged-navbar/loggedNavbar";
import Navbar from "../../components/navbar/navbar";
import { Home } from "./home/home";

interface PrivateRoutesProps {
  route: string | undefined;
}

export const PrivateRoutes: FC<PrivateRoutesProps> = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      {window.innerWidth < 750 && <MobileLoggedNavbar />}
    </BrowserRouter>
  );
};
