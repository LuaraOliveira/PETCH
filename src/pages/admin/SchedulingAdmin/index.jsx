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
                <div className="scheduling__card">
                  <p className="scheduling__card--title">Nome: Luara</p>
                  <p className="scheduling__card--title">
                    Email: luara.oliveira4@Outlook.com
                  </p>

                  <p className="scheduling__card--title">
                    Data: 03/11/2021 19:50
                  </p>
                  <p className="scheduling__card--title">Tipo: Banho</p>
                </div>
                <div className="scheduling__card">
                  <p className="scheduling__card--title">Nome: Luara</p>
                  <p className="scheduling__card--title">
                    Email: luara.oliveira4@Outlook.com
                  </p>

                  <p className="scheduling__card--title">
                    Data: 03/11/2021 19:50
                  </p>
                  <p className="scheduling__card--title">Tipo: Banho</p>
                </div>
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
