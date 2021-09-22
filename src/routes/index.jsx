import { Switch } from "react-router-dom";
import { Route } from "./Route";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Administrador from "../pages/admin/Administrador";
import CompanyPartner from "../pages/admin/CompanyPartner";
import Gifts from "../pages/admin/Gifts";
import Species from "../pages/admin/Species";
import Pets from "../pages/admin/Pets";
import Adopters from "../pages/admin/Adopters";
import Ongs from "../pages/admin/Ongs";

//page adotantes
import LoginAdopter from "../pages/adopter/Login";
import DashboardAdopter from "../pages/adopter/Dashboard";
import Settings from "../pages/adopter/Settings";
import RegisterAdopter from "../pages/adopter/Register";
export function Routes() {
  return (
    <>
      <Switch>
        <Route
          path="/"
          hasFooter={false}
          exact
          hasHeader={false}
          component={LoginAdopter}
        />
        <Route
          path="/adopter/Dashboard"
          hasFooter={false}
          exact
          hasHeader={false}
          component={DashboardAdopter}
        />
        <Route
          path="/admin/Login"
          hasFooter={false}
          exact
          hasHeader={false}
          component={Login}
        />
        <Route
          path="/admin/Dashboard"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Dashboard}
        />

        <Route
          path="/admin/Administrador"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Administrador}
        />

        <Route
          path="/admin/CompanyPartner"
          exact
          hasFooter={true}
          hasHeader={true}
          component={CompanyPartner}
        />

        <Route
          path="/admin/Gifts"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Gifts}
        />

        <Route
          path="/admin/Species"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Species}
        />

        <Route
          path="/admin/Pets"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Pets}
        />

        <Route
          path="/admin/Adopters"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Adopters}
        />

        <Route
          path="/admin/Ongs"
          exact
          hasFooter={true}
          hasHeader={true}
          component={Ongs}
        />

        <Route
          path="/adopter/Settings"
          hasFooter={false}
          exact
          hasHeader={false}
          component={Settings}
        />

        <Route
          path="/adopter/Register"
          hasFooter={false}
          exact
          hasHeader={false}
          component={RegisterAdopter}
        />
      </Switch>
    </>
  );
}
