import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import { LoaderProvider } from "./context/loadercontext";

export default function App() {
  return (
    <LoaderProvider>
      <Router>
        <Routes></Routes>
      </Router>
    </LoaderProvider>
  );
}
