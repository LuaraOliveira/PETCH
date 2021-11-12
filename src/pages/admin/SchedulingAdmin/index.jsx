import { format, parseISO } from "date-fns";
import jspdf from "jspdf";
import autotable from "jspdf-autotable";
import { useEffect, useState } from "react";

import { Breadcrumb } from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";

import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function SchedulingAdmin() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Agendamento" },
  ];
  const [schedulings, setSchedulings] = useState([]);
  useEffect(() => {
    api.get("/schedulings").then((response) => setSchedulings(response.data));
  }, []);

  async function exportSchedulings() {
    const pdf = new jspdf("l");
    const columns = [
      {
        header: "Id",
        dataKey: "id",
      },
      {
        header: "Nome",
        dataKey: "schedulingTypes",
        displayProperty: "name",
      },

      {
        header: "Hora",
        dataKey: "hour",
      },
    ];
    try {
      const response = await api.get("/schedulings/all");
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
    } catch (error) {}
  }
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
              <div className="scheduling__create--container">
                <p className="scheduling__create-title">
                  Lista de Agendamentos
                </p>
                <Button color="primary" onClick={exportSchedulings}>
                  Ver relatório completo
                </Button>
              </div>
              <div className="scheduling__body">
                {schedulings &&
                  schedulings.map((scheduling) => (
                    <div className="scheduling__card">
                      <p className="scheduling__card--title">
                        Nome: {scheduling.user.name}
                      </p>
                      <p className="scheduling__card--title">
                        Email: {scheduling.user.email}
                      </p>

                      <p className="scheduling__card--title">
                        Data: {format(parseISO(scheduling.date), "dd/MM/yyyy")}
                      </p>

                      <p className="scheduling__card--title">
                        Hora: {scheduling.hour}
                      </p>
                      <p className="scheduling__card--title">
                        Tipo: {scheduling.schedulingTypes.name}
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

export default Permission(["admin"])(SchedulingAdmin);
