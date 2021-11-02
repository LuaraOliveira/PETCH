import { Breadcrumb } from "../../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../../components/Button";
import { useState, useMemo } from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { Input } from "../../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import { usePetch } from "../../../context/petchcontext";
import Permission from "../../../utils/Permission";
import { AlertMessage } from "../../../components/Alert";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
const initialState = {
  name: "",
};

function SchedulingAdmin() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Agendamento" },
  ];

  const { scheduling, Datascheduling } = usePetch();

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

  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
  }

  // function change(event) {
  //   setRegister({
  //     ...register,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  return (
    <>
      <Header />
      <section className="container" id="Scheduling">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>

          <div className="col-md-12">
            <div className="scheduling__create">
              <p className="scheduling__create-title">Lista de Agendamentos</p>
              <div className="scheduling__body">
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal Register"
                  ariaHideApp={false}
                  portalClassName="scheduling"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">Dados da Espécie</h2>
                    </div>
                    <form className="forms">
                      <div className="modal__body">
                        <Input
                          type="text"
                          placeholder="Nome da Espécie"
                          name="name"
                        />
                        <div className="modal__buttons">
                          <Button color="light">Cancelar</Button>
                          <Button color="primary">Criar Espécie</Button>
                        </div>
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

export default Permission(["admin"])(SchedulingAdmin);
