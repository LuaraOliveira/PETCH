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
  const [favorites, setFavorites] = useState([]);
  const [solicitationTypes, setSolicitationTypes] = useState([]);
  const [schedulingTypes, setSchedulingTypes] = useState([]);

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

  function VisiblePets() {
    api.get("/pets").then((response) => {
      setPets(response.data);
    });
  }

  function DataFilterPet(pets) {
    setPets(pets);
  }

  function ShowFavorites() {
    api.get("/pets/favorites").then((response) => {
      setFavorites(response.data);
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
    ShowFavorites();
    Promise.all([
      api.get("/solicitationTypes"),
      api.get("/schedulingTypes"),
    ]).then((params) => {
      setSolicitationTypes(params[0].data);
      setSchedulingTypes(params[1].data);
    });
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
        favorites,
        solicitationTypes,
        schedulingTypes,
        DataAdmins,
        DataAdopters,
        DataPartners,
        DataGifts,
        DataSpecies,
        DataPets,
        DataOngs,
        DataFilterPet,
        VisiblePets,
        ShowFavorites,
      }}
    >
      {children}
    </PetchContext.Provider>
  );
}
