import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import SearchHistory from "../components/SearchHistory/SearchHistory";
import { PrivateRoute } from "../auth/PrivateRoute";
export default function RouteApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <SearchHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
