import Modal from "react-modal";
import { FaPaw } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoFemaleOutline, IoMaleOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";

import { AlertMessage } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

import { usePetch } from "../../context/petchcontext";
import {
  AiFillCamera,
  AiOutlineClose,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineDislike,
} from "react-icons/ai";
import api from "../../services/api";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon-petch.svg";

function CardTinder(props) {
  const { pets, DataFilterPet, favorites, gifts } = usePetch();
  const [saveGifts, setSaveGifts] = useState("");
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idPet, setIdPet] = useState("");
  function openModal(event) {
    setIsOpen(true);
    event.preventDefault();
  }

  function closeModal(event) {
    setIsOpen(false);
    event.preventDefault();
  }

  function closeModalTwo(event) {
    event.preventDefault();
    DataFilterPet(pets.filter((params) => params.id !== idPet));
    setIsOpenTwo(false);
  }

  const [modalIsOpenTwo, setIsOpenTwo] = useState(false);

  useEffect(() => {
    favorites &&
      favorites.map((favorite) =>
        favorite.pet.id === props.pet.id
          ? Object.assign(props.pet, { petfavorite: true })
          : Object.assign(props.pet, { petfavorite: false })
      );
  }, [props.pet]);

  function openModalTwo(event) {
    setIsOpenTwo(true);
  }

  const [transition, setTransition] = useState(true);

  async function Favorite(PetId) {
    try {
      await api.patch(`/favorites/${PetId}`);
      DataFilterPet(pets.filter((params) => params.id !== PetId));
    } catch (error) {}
  }

  async function Adopter(PetId) {
    try {
      const response = await api.patch(`/pets/${PetId}`);
      setIdPet(PetId);
      AlertMessage(response.data.message, response.data.background);
      openModalTwo();
    } catch (error) {}
  }

  async function Dislike(PetId) {
    try {
      await api.patch(`/dislikes/${PetId}`);
      DataFilterPet(pets.filter((params) => params.id !== PetId));
    } catch (error) {}
  }

  async function ChooseGift() {
    try {
      await api.patch(`/pets/${idPet}/gift/${saveGifts}`);

      setSaveGifts("");
      setIsOpenTwo(false);
      DataFilterPet(pets.filter((params) => params.id !== idPet));
      setIdPet("");
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <section id="CardTinder">
        <div className="card__container">
          <div className="card__content">
            {transition ? (
              <>
                <div className="card__content-image">
                  <img
                    src={props.pet.image}
                    alt="animal"
                    className="image-modal"
                  />
                </div>
                <div className="card__info">
                  <h2 className="card__info-title">
                    {props.pet.name}{" "}
                    {props.pet.gender === "M" ? (
                      <IoMaleOutline />
                    ) : (
                      <IoFemaleOutline />
                    )}
                  </h2>
                  <p className="card__info-description">
                    {props.pet.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="card__header">
                  <div className="card__header-info">
                    <h2 className="card__header-title">{props.pet.name} </h2>
                    <p className="card__header-genre">
                      {" "}
                      {props.pet.age}{" "}
                      {props.pet.gender === "M" ? (
                        <IoMaleOutline />
                      ) : (
                        <IoFemaleOutline />
                      )}
                    </p>
                  </div>
                  <div className="card__header-image">
                    <img
                      src={props.pet.image}
                      alt="avatar"
                      className="image-modal"
                    />
                    <Button color="camera" onClick={openModal}>
                      <AiFillCamera />
                    </Button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                      ariaHideApp={false}
                    >
                      <Button color="camera" onClick={closeModal}>
                        <AiOutlineClose />
                      </Button>

                      <img
                        src={props.pet.image}
                        alt="animal"
                        className="image-modal"
                      />
                    </Modal>
                  </div>
                </div>
                <div className="card__info">
                  <ul className="card__info-list">
                    <li className="text">
                      Castrado: {props.pet.cut ? "sim" : "não"}
                    </li>
                    <li className="text">Peso: {props.pet.weight}</li>
                    <li className="text">
                      Onde ele está?
                      <br /> {props.pet.ong.city}
                    </li>
                    <li className="text">
                      ONG responsável:
                      <br /> {props.pet.ong.name}
                    </li>
                  </ul>

                  <p className="card__info-subtitle">
                    Gostou? Aperte no coração que o pet vai para a lista de
                    curtidos para possível adoção.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="card__buttons">
          <Button color="circle" onClick={() => setTransition(!transition)}>
            {transition ? <FaPaw /> : <BsArrowReturnLeft />}
          </Button>
          <Button color="circle dislike" onClick={() => Dislike(props.pet.id)}>
            <AiOutlineDislike />
          </Button>
          <Button color="circle fav" onClick={() => Favorite(props.pet.id)}>
            {props.pet.petfavorite ? <AiFillStar /> : <AiOutlineStar />}
          </Button>
          <Button color="gradient" onClick={() => Adopter(props.pet.id)}>
            <AiOutlineHeart />
          </Button>
        </div>

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
              ... Você acaba de adotar um amigo, mas com ele você também ganha
              um brinde, e abaixo você poderá escolher ou você poderá escolher
              seu brinde na hora de buscá-lo na ONG.
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
            <div className="modal__buttons">
              <Button color="pink" onClick={ChooseGift}>
                Escolher Brinde
              </Button>
              <Button color="light" onClick={closeModalTwo}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}

export default CardTinder;
