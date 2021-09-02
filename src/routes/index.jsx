import { Switch } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Administrador } from "../pages/Administrador";
import { CompanyPartner } from "../pages/CompanyPartner";
import Gifts from "../pages/Gifts";
import { Species } from "../pages/Species";
import { Pets } from "../pages/Pets";
import Adopters from "../pages/Adopters";
import Ongs from "../pages/Ongs";
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

        <Route
          path="/species"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Species}
        />

        <Route
          path="/pets"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Pets}
        />

        <Route
          path="/adopters"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Adopters}
        />

        <Route
          path="/ongs"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Ongs}
        />
      </Switch>
    </>
  );
}
