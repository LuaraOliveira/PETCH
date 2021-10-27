import avatar from "../../../assets/avatar/avatar-big.jpg";
import photoBig from "../../../assets/avatar/avatar-big.jpg";
import { Input } from "../../../components/Input";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Permission from "../../../utils/Permission";
import Modal from "react-modal";
function Settings() {
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

  function openModal(event) {
    setIsOpen(true);
    event.preventDefault();
  }

  function closeModal(event) {
    setIsOpen(false);
    event.preventDefault();
  }

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="settings">
        <div className="row">
          <div className="col-md-12">
            <div className="settings__container">
              <h1 className="settings__container--title">Configurações</h1>
              <div className="settings__content">
                <form>
                  <div className="settings__header">
                    <div className="settings__image">
                      <div className="settings__image--circle">
                        <img src={avatar} alt="avatar animal" />
                        <Button color="camera" onClick={openModal}>
                          <AiFillCamera />
                        </Button>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <Button color="camera" onClick={closeModal}>
                            <AiOutlineClose />
                          </Button>
                          <img
                            src={photoBig}
                            alt="usuario"
                            className="image-modal"
                          />
                        </Modal>
                      </div>
                    </div>
                    <div className="settings__name">
                      <label htmlFor="name">Nome</label>
                      <Input type="text" placeholder="" id="name" />
                    </div>
                  </div>
                  <div className="settings__body">
                    <label htmlFor="Phone">Telefone</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Phone"
                      maxLength={15}
                      mask="phone"
                    />

                    <label htmlFor="Email">Email</label>
                    <Input type="text" placeholder="" id="Email" />

                    <label htmlFor="State">Estado</label>
                    <Input type="text" placeholder="" id="State" />

                    <label htmlFor="City">Cidade</label>
                    <Input type="text" placeholder="" id="City" />
                  </div>

                  <Button color="pink">Salvar Alterações</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Permission(["adotante"])(Settings);
