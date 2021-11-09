import iconVaccine from "../../../assets/icons/icon_vaccine.svg";
import iconMedication from "../../../assets/icons/icon_medication.svg";
import iconStar from "../../../assets/icons/icon_star.svg";
import iconSad from "../../../assets/icons/icon_sad.svg";
import iconDog from "../../../assets/icons/icon_dog.svg";
import iconHouse from "../../../assets/icons/icon_home.svg";
import { Button } from "../../../components/Button";
import Permission from "../../../utils/Permission";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { PieChart, Pie, Legend, Cell } from "recharts";
import api from "../../../services/api";
import { useEffect, useState } from "react";
import jspdf from "jspdf";
import autotable from "jspdf-autotable";

function Dashboard() {
  useEffect(() => {
    api.get("/dashboard/species").then((response) => setPets(response.data));
    api.get("/dashboard/pets").then((response) => setGender(response.data));
    api.get("/dashboard/ongs").then((response) => setOngs(response.data));
    api
      .get("/dashboard/schedulings")
      .then((response) => setSchedulings(response.data));
    api
      .get("/dashboard/solicitations")
      .then((response) => setSolicitations(response.data));
  }, []);
  const [pets, setPets] = useState([]);
  const [gender, setGender] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [schedulings, setSchedulings] = useState([]);
  const [solicitations, setSolicitations] = useState([]);
  function exportInfo() {
    const pdf = new jspdf();
    const columns = [
      {
        header: "Nome da ONG",
        dataKey: "name",
      },
      {
        header: "Quantidade",
        dataKey: "quantity",
      },
    ];
    autotable(pdf, { columns, body: ongs });
    pdf.save(`${Date.now()}.pdf`);
  }

  function exportScheduling() {
    const pdf = new jspdf();
    const columns = [
      {
        header: "Nome",
        dataKey: "name",
      },
      {
        header: "Quantidade",
        dataKey: "quantity",
      },
    ];
    autotable(pdf, { columns, body: schedulings });
    pdf.save(`${Date.now()}.pdf`);
  }

  function exportSolicitations() {
    const pdf = new jspdf();
    const columns = [
      {
        header: "Nome",
        dataKey: "name",
      },
      {
        header: "Quantidade",
        dataKey: "quantity",
      },
    ];
    autotable(pdf, { columns, body: solicitations });
    pdf.save(`${Date.now()}.pdf`);
  }

  function exportPets() {
    const pdf = new jspdf();
    const columns = [
      {
        header: "Gênero",
        dataKey: "name",
      },
      {
        header: "Total",
        dataKey: "quantity",
      },
    ];
    autotable(pdf, { columns, body: gender });
    pdf.save(`${Date.now()}.pdf`);
  }

  function exportTotalPets() {
    const pdf = new jspdf();
    const columns = [
      {
        header: "Espécie",
        dataKey: "name",
      },
      {
        header: "Total",
        dataKey: "quantity",
      },
    ];
    autotable(pdf, { columns, body: pets });
    pdf.save(`${Date.now()}.pdf`);
  }
  return (
    <>
      <Header />
      <section className="container" id="dashboard">
        <div className="row">
          <div className="col-md-12">
            <div className="dashboard__container">
              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Total de pets por espécie
                  </p>
                </div>

                <div className="dashboard__card-body">
                  <div className="dashboard__table">
                    {pets &&
                      pets.map((pet) => (
                        <div className="dashboard__table--content">
                          <p className="dashboard__table-title">{pet.name}</p>
                          <p className="dashboard__table-number">
                            {pet.quantity}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="dashboard__card-footer">
                  <Button
                    color="primary"
                    className="btn"
                    onClick={exportTotalPets}
                  >
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Total de pets cadastrados por ONG
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__table">
                    {ongs &&
                      ongs.map((ong) => (
                        <div className="dashboard__table--content">
                          <p className="dashboard__table-title">{ong.name}</p>
                          <p className="dashboard__table-number">
                            {ong.quantity}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn" onClick={exportInfo}>
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Sexo dos pets cadastrados
                  </p>
                  <span className="dashboard__card-header-subinfo">
                    {gender.reduce((acc, cor) => (acc += cor.quantity), 0)}{" "}
                    animais cadastrados
                  </span>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-graphs">
                    <PieChart width={300} height={300}>
                      <Pie
                        data={gender}
                        nameKey="name"
                        dataKey="quantity"
                        paddingAngle={2}
                      >
                        <Cell fill="#3ec6ff" />
                        <Cell fill="#fd267d" />
                      </Pie>
                      <Legend />
                    </PieChart>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn" onClick={exportPets}>
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Total de agendamentos
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-body-itens">
                    {schedulings &&
                      schedulings.map((scheduling) => (
                        <div className="item">
                          <img src={iconVaccine} alt="Icon Vacine" />
                          <span className="item">{scheduling.name}</span>
                          <span className="value">{scheduling.quantity}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button
                    color="primary"
                    className="btn"
                    onClick={exportScheduling}
                  >
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Número de Solicitações
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-body-itens">
                    {solicitations &&
                      solicitations.map((solicitation) => (
                        <div className="item">
                          <img src={iconHouse} alt="Icon House" />
                          <span className="item">{solicitation.name}</span>
                          <span className="value">{solicitation.quantity}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button
                    color="primary"
                    className="btn"
                    onClick={exportSolicitations}
                  >
                    Ver relatório completo
                  </Button>
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

export default Permission(["admin"])(Dashboard);
