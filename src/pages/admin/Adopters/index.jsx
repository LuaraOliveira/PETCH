import { Breadcrumb } from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { BiUserCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";

function Adopters() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Adotantes" },
  ];

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    api
      .get("/users?inactives=true&role=Adotante")
      .then((response) => setUsers(response.data));
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "100%",
      maxHeight: "800px",
      maxWidth: "800px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.84)",
    },
  };
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setUser(undefined);
  }

  async function infoUser(id) {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function statusUser(user) {
    const status = user.deletedAt ? "true" : "false";
    try {
      await api.delete(`/users/${user.id}`, { params: { status } });
    } catch (error) {}
  }

  return (
    <>
      <section className="container" id="adopters">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>

          <div className="col-md-12">
            <div className="adopters__create">
              <p className="adopters__create-title">Lista de adotantes</p>
              <div className="adopters__body">
                {users &&
                  users.map((user) => (
                    <div key={user.id} className="adopters__body-container">
                      <div className="adopters__body-image">
                        {!user.avatar ? (
                          <BiUserCircle />
                        ) : (
                          <img src={user?.avatar} alt="avatar" />
                        )}
                      </div>
                      <div className="adopters__body-info">
                        <ul className="adopters__body-list">
                          <li className="item">Nome: {user.name}</li>
                          <li className="item">CPF: {user.cpf}</li>
                          <li className="item">E-mail: {user.email}</li>
                          <li className="item">
                            {" "}
                            Status: {user.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="adopters__body-buttons">
                          <Button onClick={() => infoUser(user.id)}>
                            Informações
                          </Button>
                          <Button
                            className="btn"
                            color={user.deletedAt ? "success" : "disabled"}
                            onClick={() => statusUser(user)}
                          >
                            {user.deletedAt ? "Habilitar" : "Desativar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal"
                  ariaHideApp={false}
                  portalClassName="adopter"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">Mais informações</h2>
                    </div>
                    <form className="forms">
                      <div className="modal__body">
                        <ul className="modal__body-list">
                          <li className="item">Nome: {user?.name}</li>
                          <li className="item">CPF: {user?.cpf}</li>
                          <li className="item">E-mail {user?.email}</li>
                          <li className="item">Gênero: {user?.gender}</li>
                          <li className="item">Telefone: {user?.phone}</li>
                          <li className="item">CEP: {user?.cep}</li>
                          <li className="item">Endereço: {user?.address}</li>
                          <li className="item">Bairro:{user?.district}</li>
                          <li className="item">Cidade: {user?.city}</li>
                          <li className="item">UF: {user?.uf}</li>
                          <li className="item">
                            {" "}
                            Status: {user?.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Adopters;
