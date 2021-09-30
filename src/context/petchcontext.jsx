import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
export const PetchContext = createContext({});
export const usePetch = () => useContext(PetchContext);

export function PetchProvider({ children }) {
  const [admins, setAdmins] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [partners, setPartners] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [species, setSpecies] = useState([]);
  const [pets, setPets] = useState([]);
  const [ongs, setOngs] = useState([]);

  function DataAdmins() {
    api.get("/users?inactives=true&role=Admin").then((response) => {
      setAdmins(response.data);
    });
  }

  function DataAdopters() {
    api.get("/users?inactives=true&role=Adotante").then((response) => {
      setAdopters(response.data);
    });
  }

  function DataPartners() {
    api.get("/partners?inactives=true").then((response) => {
      setPartners(response.data);
    });
  }

  function DataGifts() {
    api.get("/gifts?inactives=true").then((response) => {
      setGifts(response.data);
    });
  }

  function DataSpecies() {
    api.get("/species?inactives=true").then((response) => {
      setSpecies(response.data);
    });
  }

  function DataPets() {
    api.get("/pets?inactives=true").then((response) => {
      setPets(response.data);
    });
  }

  function DataOngs() {
    api.get("/ongs?inactives=true").then((response) => {
      setOngs(response.data);
    });
  }

  useEffect(() => {
    DataAdmins();
    DataAdopters();
    DataPartners();
    DataGifts();
    DataSpecies();
    DataPets();
    DataOngs();
  }, []);

  return (
    <PetchContext.Provider
      value={{
        admins,
        adopters,
        partners,
        gifts,
        species,
        pets,
        ongs,
        DataAdmins,
        DataAdopters,
        DataPartners,
        DataGifts,
        DataSpecies,
        DataPets,
        DataOngs,
      }}
    >
      {children}
    </PetchContext.Provider>
  );
}
