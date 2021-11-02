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
    api.get("/dashboard/pets").then((response) => setGender(response.data));
    api.get("/dashboard/ongs").then((response) => setOngs(response.data));
  }, []);
  const [gender, setGender] = useState([]);
  const [ongs, setOngs] = useState([]);

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
                    Acessos médios em cada pet (dia)
                  </p>
                  <span className="dashboard__card-header-info">28</span>
                </div>
                <div className="dashboard__card-body">
                  <p className="dashboard__card-header-title">
                    Acessos em cada pet (Julho/2021)
                  </p>
                  <span className="dashboard__card-body-info">18.384</span>

                  <p className="dashboard__card-header-title">
                    Proposta de adoções aceitas (Julho/2021)
                  </p>
                  <span className="dashboard__card-body-info">1.093</span>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
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
                    {gender.reduce((acc, cor) => (acc += cor.total), 0)} animais
                    cadastrados
                  </span>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-graphs">
                    <PieChart width={300} height={300}>
                      <Pie
                        data={gender}
                        nameKey="gender"
                        dataKey="total"
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
                  <Button color="primary" className="btn">
                    Ver pets cadastrados
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Total de brindes distribuídos no mês Junho/2021
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-body-itens">
                    <div className="item">
                      <img src={iconVaccine} alt="Icon Vacine" />
                      <span className="item">Vacina</span>
                      <span className="value">1.093</span>
                    </div>
                    <div className="item">
                      <img src={iconMedication} alt="Icon Medication" />
                      <span className="item">Medicação</span>
                      <span className="value">293</span>
                    </div>
                    <div className="item">
                      <img src={iconStar} alt="Icon Bem Estar" />
                      <span className="item">Bem estar</span>
                      <span className="value">2.494</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Número de Solicitações (Julho/2021)
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-body-itens">
                    <div className="item">
                      <img src={iconHouse} alt="Icon House" />
                      <span className="item">Em aberto</span>
                      <span className="value">12</span>
                    </div>
                    <div className="item">
                      <img src={iconDog} alt="Icon Dog" />
                      <span className="item">Confirmadas</span>
                      <span className="value">312</span>
                    </div>
                    <div className="item">
                      <img src={iconSad} alt="Icon Desistencia" />
                      <span className="item">Desistência</span>
                      <span className="value">4</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
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
