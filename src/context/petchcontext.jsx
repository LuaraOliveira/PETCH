import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
export const PetchContext = createContext({});
export const usePetch = () => useContext(PetchContext);

export function PetchProvider({ children }) {
  const [partners, setPartners] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [species, setSpecies] = useState([]);
  const [pets, setPets] = useState([]);
  const [ongs, setOngs] = useState([]);
  useEffect(() => {
    Promise.all([
      api.get("/partners?inactives=true"),
      api.get("/gifts?inactives=true"),
      api.get("/species?inactives=true"),
      api.get("/pets"),
      api.get("/ongs"),
    ]).then((response) => {
      setPartners(response[0].data);
      setGifts(response[1].data);
      setSpecies(response[2].data);
      setPets(response[3].data);
      setOngs(response[4].data);
    });
  }, []);

  return (
    <PetchContext.Provider value={{ partners, gifts, species }}>
      {children}
    </PetchContext.Provider>
  );
}
