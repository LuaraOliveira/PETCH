import jspdf from "jspdf";
import autotable from "jspdf-autotable";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  LabelList,
  YAxis,
} from "recharts";

import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";

import { useLoader } from "../../../context/loadercontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function Dashboard() {
  const { HandlerLoader } = useLoader();

  const [pets, setPets] = useState([]);
  const [gender, setGender] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [schedulings, setSchedulings] = useState([]);
  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    HandlerLoader(true);
    Promise.all([
      api.get("/dashboard/species"),
      api.get("/dashboard/pets"),
      api.get("/dashboard/ongs"),
      api.get("/dashboard/schedulings"),
      api.get("/dashboard/solicitations"),
    ])
      .then((response) => {
        setPets(response[0].data);
        setGender(response[1].data);
        setOngs(response[2].data);
        setSchedulings(response[3].data);
        setSolicitations(response[4].data);
      })
      .finally(() => HandlerLoader(false));
  }, []);

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
    autotable(pdf, {
      columns,
      body: ongs,
      headStyles: { fillColor: "#3ec6ff" },
      styles: { lineWidth: 0.5, halign: "center", valign: "middle" },
    });
    pdf.output(`dataurlnewwindow`);
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
    autotable(pdf, {
      columns,
      body: schedulings,
      headStyles: { fillColor: "#3ec6ff" },
      styles: { lineWidth: 0.5, halign: "center", valign: "middle" },
    });
    pdf.output(`dataurlnewwindow`);
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
    autotable(pdf, {
      columns,
      body: solicitations,
      headStyles: { fillColor: "#3ec6ff" },
      styles: { lineWidth: 0.5, halign: "center", valign: "middle" },
    });
    pdf.output(`dataurlnewwindow`);
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
    autotable(pdf, {
      columns,
      body: gender,
      headStyles: { fillColor: "#3ec6ff" },
      styles: { lineWidth: 0.5, halign: "center", valign: "middle" },
    });
    pdf.output(`dataurlnewwindow`);
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
    autotable(pdf, {
      columns,
      body: pets,
      headStyles: { fillColor: "#3ec6ff" },
      styles: { lineWidth: 0.5, halign: "center", valign: "middle" },
    });
    pdf.output(`dataurlnewwindow`);
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
                    <div className="dashboard__card-graphs">
                      <BarChart data={pets} width={300} height={300}>
                        <Bar
                          barSize={40}
                          fill="#3ec6ff"
                          name="quantidade"
                          dataKey="quantity"
                        >
                          <LabelList
                            dataKey="quantity"
                            fontSize={16}
                            position="centerBottom"
                          />
                        </Bar>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis />
                        <Legend />
                      </BarChart>
                    </div>
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
                    <div className="dashboard__card-graphs">
                      <BarChart data={ongs} width={300} height={300}>
                        <Bar
                          barSize={40}
                          fill="#3ec6ff"
                          name="quantidade"
                          dataKey="quantity"
                        >
                          <LabelList
                            dataKey="quantity"
                            fontSize={16}
                            position="centerBottom"
                          />
                        </Bar>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis />
                        <Legend />
                      </BarChart>
                    </div>
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
                    <div className="dashboard__card-graphs">
                      <BarChart data={schedulings} width={300} height={300}>
                        <Bar
                          barSize={40}
                          fill="#3ec6ff"
                          name="quantidade"
                          dataKey="quantity"
                        >
                          <LabelList
                            dataKey="quantity"
                            fontSize={16}
                            position="centerBottom"
                          />
                        </Bar>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis />
                        <Legend />
                      </BarChart>
                    </div>
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
                    <div className="dashboard__card-graphs">
                      <BarChart data={solicitations} width={300} height={300}>
                        <Bar
                          barSize={40}
                          fill="#3ec6ff"
                          name="quantidade"
                          dataKey="quantity"
                        >
                          <LabelList
                            dataKey="quantity"
                            fontSize={16}
                            position="centerBottom"
                          />
                        </Bar>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis />
                        <Legend />
                      </BarChart>
                    </div>
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
