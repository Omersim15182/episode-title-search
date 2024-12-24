import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }} //need to check this
    >
      <PrivateRoute />
    </BrowserRouter>
  );
}
