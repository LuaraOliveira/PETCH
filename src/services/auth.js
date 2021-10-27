import Cookie from "js-cookie";

export const isAuth = () =>
  Cookie.get(process.env.REACT_APP_COOKIE_TOKEN) !== undefined;

export const getRole = () => Cookie.get(process.env.REACT_APP_COOKIE_ROLE);

export const isLogin = (token) =>
  Cookie.set(process.env.REACT_APP_COOKIE_TOKEN, token);

export const setRole = (role) =>
  Cookie.set(process.env.REACT_APP_COOKIE_ROLE, role);

export const isLogout = () => {
  Cookie.remove(process.env.REACT_APP_COOKIE_TOKEN);
  Cookie.remove(process.env.REACT_APP_COOKIE_ROLE);
  Cookie.remove(process.env.REACT_APP_USER);
  window.location.href = "/";
};

export const isUserLogin = (user) => {
  Cookie.set(process.env.REACT_APP_USER, user);
};
