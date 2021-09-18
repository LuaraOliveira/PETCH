import { Route as RouteDOM } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PetchProvider } from "../context/petchcontext";

export function Route({ hasHeader = true, hasFooter = true, ...rest }) {
  return (
    <PetchProvider>
      {hasHeader && <Header />}
      <RouteDOM {...rest} />
      {hasFooter && <Footer />}
    </PetchProvider>
  );
}
