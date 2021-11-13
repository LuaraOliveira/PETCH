import { useState } from "react";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { Select } from "../../../components/Select";

import { useLoader } from "../../../context/loadercontext";
import api from "../../../services/api";
import { usePetch } from "../../../context/petchcontext";

function Solicitations() {
  const { HandlerLoader } = useLoader();
  const { solicitationTypes } = usePetch();

  const [solicitation, setSolicitation] = useState({
    solicitationTypesId: "",
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
    HandlerLoader(true);
    try {
      const response = await api.post("/solicitations", solicitation);
      AlertMessage(response.data.message, response.data.background);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
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
                name="solicitationTypesId"
                value={solicitation.solicitationTypesId}
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
