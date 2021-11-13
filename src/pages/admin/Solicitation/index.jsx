import jspdf from "jspdf";
import autotable from "jspdf-autotable";
import { useEffect, useState } from "react";

import { Breadcrumb } from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";

import { useLoader } from "../../../context/loadercontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function Solicitation() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Solicitação" },
  ];
  const { HandlerLoader } = useLoader();
  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    api
      .get("/solicitations")
      .then((response) => setSolicitations(response.data));
  }, []);

  async function exportSolicitations() {
    const pdf = new jspdf("l");
    const columns = [
      {
        header: "Id",
        dataKey: "id",
      },
      {
        header: "Tipo",
        dataKey: "solicitationTypes",
        displayProperty: "name",
      },
      {
        header: "Email",
        dataKey: "user",
        displayProperty: "name",
      },
      {
        header: "Nome",
        dataKey: "user",
        displayProperty: "email",
      },
    ];
    HandlerLoader(true);
    try {
      const response = await api.get("/solicitations/all");
      autotable(pdf, {
        columns,
        body: response.data,
        didParseCell: (data) => {
          if (data.column.raw.displayProperty) {
            const prop = data.column.raw.displayProperty;
            const text = data.cell.raw[prop];
            if (text && text.length > 0) {
              data.cell.text = text;
            }
          }
        },
      });
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
      <section className="container" id="Solicitations">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>

          <div className="col-md-12">
            <div className="solicitations__create">
              <div className="solicitations__create--container">
                <p className="solicitations__create-title">
                  Lista de Solicitações
                </p>
                <Button color="primary" onClick={exportSolicitations}>
                  Ver relatório completo
                </Button>
              </div>
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
