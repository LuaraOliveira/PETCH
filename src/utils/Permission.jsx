import { Redirect } from "react-router-dom";
import { getRole } from "../services/auth";
const Permission =
  (role, redirect = "/") =>
  (Component) =>
  (props) => {
    const rolerUser = getRole()?.toLowerCase();
    if (!rolerUser) return <Redirect to={"/"} />;
    return role.includes(rolerUser) ? (
      <Component {...props} />
    ) : (
      <Redirect to={redirect} />
    );
  };

export default Permission;
