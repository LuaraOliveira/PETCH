import avatar from "../../../assets/avatar/avatar-big.jpg";
import { FaUserCircle } from "react-icons/fa";
import photoBig from "../../../assets/avatar/avatar-big.jpg";
import { Input } from "../../../components/Input";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { Button } from "../../../components/Button";
import { useState, useEffect, useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Permission from "../../../utils/Permission";
import Modal from "react-modal";
import api from "../../../services/api";
import axios from "axios";
const initialState = {
  name: "",
  email: "",
  cpf: "",
  address: "",
  cep: "",
  district: "",
  number: "",
  complement: "",
  phone: "",
  city: "",
  uf: "",
  avatar: "",
};

function Settings() {
  const [user, setUser] = useState(initialState);
  const [edition, setEdition] = useState(initialState);
  const address = useRef(null);
  const district = useRef(null);

  useEffect(() => {
    api.get("/users/profile").then((response) => setUser(response.data));
  }, []);

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

  function changeEdit(event) {
    setEdition({
      ...edition,
      [event.target.name]: event.target.value,
    });
  }

  async function searchCep(event) {
    event.preventDefault();
    const apiCep = `https://viacep.com.br/ws/${edition.cep}/json/`;
    const response = await axios.get(apiCep);
    const { logradouro, localidade, uf, bairro } = response.data;
    setEdition({
      ...edition,
      address: logradouro,
      city: localidade,
      district: bairro,
      uf,
    });
    !address.current?.value
      ? address.current?.removeAttribute("disabled")
      : address.current?.setAttribute("disabled", "false");

    !district.current?.value
      ? district.current?.removeAttribute("disabled")
      : district.current?.setAttribute("disabled", "false");
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
                        {!user.avatar ? (
                          <FaUserCircle />
                        ) : (
                          <img src={user.avatar} alt="avatar" />
                        )}

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
                      <Input
                        type="text"
                        placeholder=""
                        id="name"
                        defaultValue={user.name}
                        // onChange={changeEdit}
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="settings__body">
                    <label htmlFor="cpf">CPF</label>
                    <Input
                      type="text"
                      mask="cpf"
                      name="cpf"
                      defaultValue={user?.cpf}
                      onChange={changeEdit}
                      maxLength={14}
                    />
                    <label htmlFor="Phone">Telefone</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Phone"
                      maxLength={15}
                      mask="phone"
                      defaultValue={user?.phone}
                      onChange={changeEdit}
                      name="phone"
                    />

                    <label htmlFor="Email">Email</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Email"
                      defaultValue={user?.email}
                      onChange={changeEdit}
                      name="email"
                    />

                    <label htmlFor="Cep">CEP</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Cep"
                      defaultValue={user?.cep}
                      onChange={changeEdit}
                      name="cep"
                      mask="cep"
                      maxLength={9}
                    />

                    <label htmlFor="Address">Endereço</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Address"
                      defaultValue={user?.address}
                      onChange={changeEdit}
                      name="address"
                      ref={address}
                    />

                    <label htmlFor="District">Bairro</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="District"
                      defaultValue={user?.district}
                      onChange={changeEdit}
                      name="district"
                      ref={district}
                    />

                    <label htmlFor="Number">Número</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Number"
                      defaultValue={user?.number}
                      onChange={changeEdit}
                      name="number"
                    />

                    <label htmlFor="Complement">Complemento</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Complement"
                      defaultValue={user?.complement}
                      onChange={changeEdit}
                      name="complement"
                    />

                    <label htmlFor="uf">Estado</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="uf"
                      defaultValue={user?.uf}
                      onChange={changeEdit}
                      name="uf"
                      disabled
                    />

                    <label htmlFor="City">Cidade</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="City"
                      defaultValue={user?.city}
                      onChange={changeEdit}
                      name="city"
                      disabled
                    />
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
