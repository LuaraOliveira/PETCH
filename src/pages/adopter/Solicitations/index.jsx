import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { usePetch } from "../../../context/petchcontext";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { Select } from "../../../components/Select";
import { useState } from "react";
import api from "../../../services/api";
import { AlertMessage } from "../../../components/Alert";
function Solicitations() {
  const { solicitationTypes } = usePetch();
  const [solicitation, setSolicitation] = useState({
    solicitationTypeId: "",
    description: "",
  });

  function change(event) {
    setSolicitation({
      ...solicitation,
      [event.target.name]: event.target.value,
    });
  }

  async function sendSolicitation(event) {
    event.preventDefault();
    try {
      const response = await api.post("/solicitations", solicitation);
      AlertMessage(response.data.message, response.data.background);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }
  return (
    <>
      <HeaderAdopter />
      <section className="container" id="Solicitations">
        <div className="row">
          <div className="col-12">
            <h1 className="Solicitations__title">Solicitação</h1>

            <form onSubmit={sendSolicitation} className="Solicitations__body">
              <Select
                name="solicitationTypeId"
                value={solicitation.solicitationTypeId}
                onChange={change}
              >
                <option value="" defaultChecked disabled>
                  Tipo de Solicitação
                </option>
                {solicitationTypes &&
                  solicitationTypes.map((solicitation) => (
                    <option value={solicitation.id} key={solicitation.id}>
                      {solicitation.name}
                    </option>
                  ))}
              </Select>

              <label for="solicitations" className="Solicitations__label">
                Escreva sua solicitação
              </label>

              <textarea
                id="solicitations"
                name="description"
                rows="5"
                cols="33"
                className="Solicitations__textarea"
                onChange={change}
                value={solicitation.description}
              ></textarea>

              <Button color="pink">Cadastrar</Button>
            </form>
          </div>
        </div>
      </section>
      <FooterAdopter />
    </>
  );
}
export default Solicitations;
