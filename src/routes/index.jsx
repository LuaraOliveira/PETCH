import { Switch} from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Route } from './Route'


export function Routes() {
    return (
        <>
            <Switch>
                <Route
                    path="/"
                    hasFooter={false}
                    exact
                    hasHeader={false}
                    component={Login} />
                <Route
                    path="/dashboard"
                    exact
                    hasFooter={true}
                    hasHeader={true}
                    component={Dashboard} />
            </Switch>
        </>
    )
}