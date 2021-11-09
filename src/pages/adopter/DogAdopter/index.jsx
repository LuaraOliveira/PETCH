import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { Button } from "../../../components/Button";
import { useEffect } from "react";
import Permission from "../../../utils/Permission";
import { usePetch } from "../../../context/petchcontext";
import { AiOutlineHeart, AiOutlineDislike } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import api from "../../../services/api";
import { AlertMessage } from "../../../components/Alert";
function DogAdopter(props) {
  const { ShowFavorites, favorites, DataFilterPet, pets } = usePetch();
  useEffect(() => {
    ShowFavorites();
  }, []);

  async function Adopter(PetId) {
    try {
      const response = await api.patch(`/pets/${PetId}`);
      AlertMessage(response.data.message, response.data.background);
    } catch (error) {}
  }

  async function Dislike(PetId) {
    try {
      await api.delete(`/favorites/${PetId}`);
      ShowFavorites();
    } catch (error) {}
  }

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="Favorites">
        <div className="row">
          <div className="col-12">
            <h1 className="Favorites__title">Lista de Adotados</h1>
            <div className="Favorites__body">
              {favorites &&
                favorites.map((pet) => (
                  <section key={pet.id} id="CardTinder">
                    <div className="card__container">
                      <div className="card__content">
                        <div className="card__content-image">
                          <img
                            src={pet.image}
                            alt="animal"
                            className="image-modal"
                          />
                        </div>
                        <div className="card__info">
                          <h2 className="card__info-title">{pet.name} ♂</h2>
                          <p className="card__info-description">
                            {pet.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card__buttons">
                      <Button
                        color="circle dislike"
                        onClick={() => Dislike(pet.id)}
                      >
                        <BsFillTrashFill />
                      </Button>
                      <Button color="gradient" onClick={() => Adopter(pet.id)}>
                        <AiOutlineHeart />
                      </Button>
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
