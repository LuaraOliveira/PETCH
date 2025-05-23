import jspdf from "jspdf";
import autotable from "jspdf-autotable";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";

import { AlertMessage } from "../../../components/Alert";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";

import { useLoader } from "../../../context/loadercontext";
import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function Adopters() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Adotantes" },
  ];

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

  const { HandlerLoader } = useLoader();
  const { adopters, DataAdopters } = usePetch();

  const [adopter, setAdopter] = useState(undefined);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setAdopter(undefined);
  }

  async function infoAdopter(id) {
    HandlerLoader(true);
    try {
      const response = await api.get(`/users/${id}?inactives=true`);
      setAdopter(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  async function statusAdopter(adopter) {
    const status = adopter.deletedAt ? "true" : "false";
    HandlerLoader(true);
    try {
      await api.delete(`/users/${adopter.id}`, { params: { status } });
      DataAdopters();
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }
  async function exportAdopter() {
    const pdf = new jspdf("l");
    const columns = [
      {
        header: "Id",
        dataKey: "id",
      },
      {
        header: "Nome",
        dataKey: "name",
      },
      {
        header: "Email",
        dataKey: "email",
      },
      {
        header: "CPF",
        dataKey: "cpf",
      },
      {
        header: "Telefone",
        dataKey: "phone",
      },
    ];
    HandlerLoader(true);
    try {
      const response = await api.get("/users/all?role=Adotante");
      autotable(pdf, { columns, body: response.data });
      console.log(response.data);
      pdf.output(`dataurlnewwindow`);
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }
  return (
    <>
      <Header />
      <section className="container" id="adopters">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>

          <div className="col-md-12">
            <div className="adopters__create">
              <div className="adopters__create--container">
                <p className="adopters__create-title">Lista de Adotantes</p>
                <Button color="primary" onClick={exportAdopter}>
                  Ver relatório completo
                </Button>
              </div>
              <div className="adopters__body">
                {adopters &&
                  adopters.map((adopter) => (
                    <div key={adopter.id} className="adopters__body-container">
                      <div className="adopters__body-image">
                        {!adopter.avatar ? (
                          <BiUserCircle />
                        ) : (
                          <img src={adopter?.avatar} alt="avatar" />
                        )}
                      </div>
                      <div className="adopters__body-info">
                        <ul className="adopters__body-list">
                          <li className="item">Nome: {adopter.name}</li>
                          <li className="item">CPF: {adopter.cpf}</li>
                          <li className="item">E-mail: {adopter.email}</li>
                          <li className="item">
                            {" "}
                            Status: {adopter.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="adopters__body-buttons">
                          <Button onClick={() => infoAdopter(adopter.id)}>
                            Informações
                          </Button>
                          <Button
                            className="btn"
                            color={adopter.deletedAt ? "success" : "disabled"}
                            onClick={() => statusAdopter(adopter)}
                          >
                            {adopter.deletedAt ? "Habilitar" : "Desativar"}
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
                          <li className="item">Nome: {adopter?.name}</li>
                          <li className="item">CPF: {adopter?.cpf}</li>
                          <li className="item">E-mail {adopter?.email}</li>
                          <li className="item">Gênero: {adopter?.gender}</li>
                          <li className="item">Telefone: {adopter?.phone}</li>
                          <li className="item">CEP: {adopter?.cep}</li>
                          <li className="item">Endereço: {adopter?.address}</li>
                          <li className="item">Bairro:{adopter?.district}</li>
                          <li className="item">Cidade: {adopter?.city}</li>
                          <li className="item">UF: {adopter?.uf}</li>
                          <li className="item">
                            {" "}
                            Status: {adopter?.deletedAt ? "inativo" : "ativo"}
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
      <Footer />
    </>
  );
}

export default Permission(["admin"])(Adopters);
