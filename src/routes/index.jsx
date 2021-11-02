import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Administrador from "../pages/admin/Administrador";
import CompanyPartner from "../pages/admin/CompanyPartner";
import Gifts from "../pages/admin/Gifts";
import Species from "../pages/admin/Species";
import Pets from "../pages/admin/Pets";
import Solicitation from "../pages/admin/Solicitation";
import SchedulingAdmin from "../pages/admin/SchedulingAdmin";
import Adopters from "../pages/admin/Adopters";
import SettingsAdmin from "../pages/admin/SettingsAdmin";
import Ongs from "../pages/admin/Ongs";
import { PetchProvider } from "../context/petchcontext";
import { getRole } from "../services/auth";

//page adotantes
import LoginAdopter from "../pages/adopter/Login";
import DashboardAdopter from "../pages/adopter/Dashboard";
import Solicitations from "../pages/adopter/Solicitations";
import Settings from "../pages/adopter/Settings";
import Favorites from "../pages/adopter/Favorites";
import RegisterAdopter from "../pages/adopter/Register";
import RecoveryPassword from "../pages/adopter/RecoveryPassword";
import AdoptionRequest from "../pages/adopter/AdoptionRequest";
import RegisterConfirmation from "../pages/adopter/RegisterConfirmation";
import AlterPassword from "../pages/adopter/AlterPassword";
import Scheduling from "../pages/adopter/Scheduling";
function RoutesAdmin() {
  return (
    <>
      <Route path="/admin/Dashboard" exact component={Dashboard} />

      <Route path="/admin/Administrador" exact component={Administrador} />

      <Route path="/admin/CompanyPartner" exact component={CompanyPartner} />

      <Route path="/admin/Solicitation" exact component={Solicitation} />

      <Route path="/admin/SchedulingAdmin" exact component={SchedulingAdmin} />

      <Route path="/admin/Gifts" exact component={Gifts} />

      <Route path="/admin/Species" exact component={Species} />

      <Route path="/admin/Pets" exact component={Pets} />

      <Route path="/admin/Adopters" exact component={Adopters} />

      <Route path="/admin/Ongs" exact component={Ongs} />

      <Route path="/admin/SettingsAdmin" exact component={SettingsAdmin} />
    </>
  );
}

function RoutesAdopters() {
  return (
    <>
      <Route path="/adopter/Dashboard" exact component={DashboardAdopter} />

      <Route path="/adopter/Settings" exact component={Settings} />

      <Route path="/Adopter/Favorites" exact component={Favorites} />

      <Route path="/Adopter/Solicitations" exact component={Solicitations} />

      <Route path="/Adopter/Scheduling" exact component={Scheduling} />

      <Route
        path="/adopter/AdoptionRequest"
        exact
        component={AdoptionRequest}
      />
    </>
  );
}

export function Routes() {
  return (
    <>
      <Switch>
        <Route
          path="/adopter/RegisterConfirmation"
          exact
          component={RegisterConfirmation}
        />
        <Route
          path="/Adopter/RecoveryPassword"
          exact
          component={RecoveryPassword}
        />
        <Route path="/Adopter/AlterPassword" exact component={AlterPassword} />
        <Route path="/Adopter/Register" exact component={RegisterAdopter} />

        <Route path="/" exact component={LoginAdopter} />
        <PetchProvider>
          <RoutesAdmin />
          <RoutesAdopters />
          {/* {getRole() !== undefined &&
            getRole()?.toLowerCase() === "adotante" && }

          {getRole() !== undefined && getRole()?.toLowerCase() === "admin" && (
            
          )} */}
        </PetchProvider>
      </Switch>
    </>
  );
}
