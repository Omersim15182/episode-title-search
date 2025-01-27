import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import { PrivateRoute } from "../auth/PrivateRoute";
import Home from "../components/Home/Home";
import MenuBar from "../components/Menu/MenuBar";
import Chat from "../components/Chat/Chat";

export default function RouteApp() {
  return (
    <>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/Chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
