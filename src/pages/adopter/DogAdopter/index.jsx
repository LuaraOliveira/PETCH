import { useEffect, useState } from "react";

import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { FooterAdopter } from "../../../components/FooterAdopter";

import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function DogAdopter(props) {
  const [savePets, setSavePets] = useState([]);
  useEffect(() => {
    api.get("/pets/mypets").then((response) => setSavePets(response.data));
  }, []);

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="Favorites">
        <div className="row">
          <div className="col-12">
            <h1 className="Favorites__title">Lista de Adotados</h1>
            <div className="Favorites__body">
              {savePets &&
                savePets.map((savePet) => (
                  <section key={savePet.id} id="CardTinder">
                    <div className="card__container">
                      <div className="card__content">
                        <div className="card__content-image">
                          <img
                            src={savePet.image}
                            alt="animal"
                            className="image-modal"
                          />
                        </div>
                        <div className="card__info">
                          <h2 className="card__info-title">{savePet.name}</h2>
                          <p className="card__info-description">
                            {savePet.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
            </div>
          </div>
        </div>
      </section>

      <FooterAdopter />
    </>
  );
}

export default Permission(["adotante"])(DogAdopter);
