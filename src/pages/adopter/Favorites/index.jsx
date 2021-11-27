import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { IoFemaleOutline, IoMaleOutline } from "react-icons/io5";
import Modal from "react-modal";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { Select } from "../../../components/Select";

import { ReactComponent as LikeIcon } from "../../../assets/icons/like-icon-petch.svg";
import { useLoader } from "../../../context/loadercontext";
import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function Favorites(props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "16px",
      padding: "16px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { ShowFavorites, favorites, DataFilterPet, pets, gifts } = usePetch();
  const { HandlerLoader } = useLoader();
  const [saveGifts, setSaveGifts] = useState("");

  const [idPet, setIdPet] = useState("");
  function openModalTwo(event) {
    setIsOpenTwo(true);
    event.preventDefault();
  }

  const [modalIsOpenTwo, setIsOpenTwo] = useState(false);

  function closeModalTwo(event) {
    event.preventDefault();
    ShowFavorites();
    setIsOpenTwo(false);
  }

  useEffect(() => {
    ShowFavorites();
  }, []);

  async function Adopter(PetId) {
    HandlerLoader(true);
    try {
      const response = await api.patch(`/pets/${PetId}`);
      setIdPet(PetId);
      AlertMessage(response.data.message, response.data.background);
      openModalTwo();
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }
  async function Dislike(PetId) {
    try {
      await api.delete(`/favorites/${PetId}`);

      ShowFavorites();
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }

  async function ChooseGift() {
    HandlerLoader(true);
    try {
      await api.patch(`/pets/${idPet}/gift/${saveGifts}`);

      setSaveGifts("");
      setIsOpenTwo(false);
      ShowFavorites();
      setIdPet("");
    } catch (error) {
      console.log(error.response);
    } finally {
      HandlerLoader(false);
    }
  }

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="Favorites">
        <div className="row">
          <div className="col-12">
            <h1 className="Favorites__title">Lista de Favoritos</h1>
            <div className="Favorites__body">
              {favorites &&
                favorites.map((favorite) => (
                  <section key={favorite.id} id="CardTinder">
                    <div className="card__container">
                      <div className="card__content">
                        <div className="card__content-image">
                          <img
                            src={favorite.pet.image}
                            alt="animal"
                            className="image-modal"
                          />
                        </div>
                        <div className="card__info">
                          <h2 className="card__info-title">
                            {favorite.pet.name}
                            {favorite.pet.gender === "M" ? (
                              <IoMaleOutline />
                            ) : (
                              <IoFemaleOutline />
                            )}
                          </h2>
                          <p className="card__info-description">
                            {favorite.pet.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card__buttons">
                      <Button
                        color="circle dislike"
                        onClick={() => Dislike(favorite.id)}
                      >
                        <BsFillTrashFill />
                      </Button>
                      <Button
                        color="gradient"
                        onClick={() => Adopter(favorite.pet.id)}
                      >
                        <AiOutlineHeart />
                      </Button>
                    </div>
                  </section>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpenTwo}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        onRequestClose={closeModalTwo}
      >
        <div className="ModalAdopter__body">
          <div className="ModalAdopter__image">
            <LikeIcon />
          </div>
          <p className="ModalAdopter__body--title">
            ... Você acaba de adotar um amigo, mas com ele você também ganha um
            brinde, e abaixo você poderá escolher ou você poderá escolher seu
            brinde na hora de buscá-lo na ONG.
          </p>

          <Select
            onChange={(event) => setSaveGifts(event.target.value)}
            value={saveGifts}
            name="gift"
          >
            <option value="" defaultChecked disabled>
              Selecione seu Brinde
            </option>
            {gifts &&
              gifts.map((gift) => (
                <option value={gift.id} key={gift.id}>
                  {gift.name}
                </option>
              ))}
          </Select>

          <div class="modal__buttons">
            <Button color="pink" onClick={ChooseGift}>
              Escolher Brinde
            </Button>
            <Button color="light" onClick={closeModalTwo}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
      <FooterAdopter />
    </>
  );
}

export default Permission(["adotante"])(Favorites);
