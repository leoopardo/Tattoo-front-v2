import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { Home } from "./private/home/home";
import { MobileLoggedNavbar } from "../components/logged-navbar/loggedNavbar";
import Landing from "./public/landing/landing";
import Signup from "./public/signup/signup";
import RequireAuth from "./RequireAuth";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Landing />} />

        <Route element={<RequireAuth />}>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Home />} />
            <Route path="chat" element={<Home />} />
            <Route path="schedule" element={<Home />} />
          </Route>
        </Route>
      </Routes>
      {window.innerWidth < 750 && <MobileLoggedNavbar />}
    </BrowserRouter>
  );
};
