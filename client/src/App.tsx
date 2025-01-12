import { ActorProvider } from "./context/ActorContext";
import RouteApp from "./routes/RouteApp";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <ActorProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <RouteApp />
      </BrowserRouter>
    </ActorProvider>
  );
}
