import { Redirect } from "react-router-dom";

const Permission = (role) => (Component) => (props) => {
  const rolerUser = "adotante";
  //   if (!rolerUser) return;
  return role.includes(rolerUser) ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  );
};

export default Permission;
