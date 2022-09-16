import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Landing from "./landing/landing";
import Signup from "./signup/signup";

interface PublicRoutesProps {
  route: string | undefined;
}

const PublicRoutes: FC<PublicRoutesProps> = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
