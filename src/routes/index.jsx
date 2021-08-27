import { Switch } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Administrador } from "../pages/Administrador";
import { CompanyPartner } from "../pages/CompanyPartner";
import { Gifts } from "../pages/Gifts";
import { Route } from "./Route";

export function Routes() {
  return (
    <>
      <Switch>
        <Route
          path="/"
          hasFooter={false}
          exact
          hasHeader={false}
          component={Login}
        />
        <Route
          path="/dashboard"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Dashboard}
        />

        <Route
          path="/administrador"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Administrador}
        />

        <Route
          path="/companyPartner"
          exact
          hasFooter={true}
          hasHeader={true}
          component={CompanyPartner}
        />

        <Route
          path="/gifts"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Gifts}
        />
      </Switch>
    </>
  );
}
