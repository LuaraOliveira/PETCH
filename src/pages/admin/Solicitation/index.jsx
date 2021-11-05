import { Breadcrumb } from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

function Solicitation() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Solicitação" },
  ];

  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    api
      .get("/solicitations")
      .then((response) => setSolicitations(response.data));
  }, []);

  return (
    <>
      <Header />
      <section className="container" id="Solicitations">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>

          <div className="col-md-12">
            <div className="solicitations__create">
              <p className="solicitations__create-title">
                Lista de Solicitações
              </p>
              <div className="solicitations__body">
                {solicitations &&
                  solicitations.map((solicitation) => (
                    <div className="solicitations__card">
                      <p className="solicitations__card--title">
                        Tipo: {solicitation.solicitationTypes.name}
                      </p>
                      <p className="solicitations__card--title">
                        Nome: {solicitation.user.name}
                      </p>
                      <p className="solicitations__card--title">
                        E-mail: {solicitation.user.email}
                      </p>
                      <p className="solicitations__card--title">
                        Mensagem: {solicitation.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Permission(["admin"])(Solicitation);
