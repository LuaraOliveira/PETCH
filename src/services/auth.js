import Cookie from "js-cookie";

export const isAuth = () =>
  Cookie.get(process.env.REACT_APP_COOKIE_TOKEN) !== undefined;

export const isLogin = (token) =>
  Cookie.set(process.env.REACT_APP_COOKIE_TOKEN, token);

export const isLogout = () => {
  Cookie.remove(process.env.REACT_APP_COOKIE_TOKEN);
  window.location.href = "/";
};
