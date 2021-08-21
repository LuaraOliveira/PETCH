import Cookie from "js-cookie";

export const isAuth = () => Cookie.get("isToken") !== undefined;

export const isLogin = (token) => Cookie.set("isToken", token);

export const isLogout = () => {
  Cookie.remove("isToken");
  window.location.href = "/";
};
