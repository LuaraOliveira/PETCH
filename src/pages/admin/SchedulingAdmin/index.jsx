import { Breadcrumb } from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { format, parseISO } from "date-fns";
function SchedulingAdmin() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Agendamento" },
  ];
  const [schedulings, setSchedulings] = useState([]);
  useEffect(() => {
    api.get("/schedulings").then((response) => setSchedulings(response.data));
  }, []);
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
                {schedulings &&
                  schedulings.map((scheduling) => (
                    <div className="scheduling__card">
                      <p className="scheduling__card--title">
                        Nome: {scheduling.userId}
                      </p>
                      <p className="scheduling__card--title">
                        Email: {scheduling.userId}
                      </p>

                      <p className="scheduling__card--title">
                        Data:{" "}
                        {format(
                          parseISO(scheduling.date),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </p>
                      <p className="scheduling__card--title">
                        Tipo: {scheduling.schedulingTypesId}
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
