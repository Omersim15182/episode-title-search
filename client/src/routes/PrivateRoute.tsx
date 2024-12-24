import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Home from "../components/Home";

export default function PrivateRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}
