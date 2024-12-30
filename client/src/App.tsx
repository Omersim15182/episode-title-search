import RouteApp from "./routes/RouteApp";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <RouteApp />
    </BrowserRouter>
  );
}
