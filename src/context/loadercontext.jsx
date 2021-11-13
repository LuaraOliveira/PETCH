import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
export const LoaderContext = createContext({});
export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({ children }) {
  const [loader, setLoader] = useState(false);

  function HandlerLoader(param) {
    setLoader(param);
  }

  return (
    <LoaderContext.Provider value={{ loader, setLoader, HandlerLoader }}>
      {children}
      {loader && (
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      )}
    </LoaderContext.Provider>
  );
}
