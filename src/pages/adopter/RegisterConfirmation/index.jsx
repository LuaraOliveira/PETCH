import { useEffect } from "react";

import logo from "../../../assets/logo/logo-white.png";

import { useLoader } from "../../../context/loadercontext";
import api from "../../../services/api";

function RegisterConfirmation() {
  const { HandlerLoader } = useLoader();

  useEffect(() => {
    async function confirmationEmail() {
      HandlerLoader(true);
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const token = params.get("token");
      const email = params.get("email");
      if (token && email) {
        window.history.pushState({}, "", "/adopter/RegisterConfirmation");
      }
      try {
        await api.patch(`/users/confirm?token=${token}&email=${email}`);
      } catch (error) {
        console.log(error.response);
      } finally {
        HandlerLoader(false);
      }
    }

    confirmationEmail();
  }, []);

  return (
    <>
      <section className="RegisterConfirmation">
        <div className="RegisterConfirmation__image"></div>
        <div className="RegisterConfirmation__container">
          <div className="RegisterConfirmation__content">
            <div className="RegisterConfirmation__header">
              <img src={logo} alt="Petch" />
              <p className="RegisterConfirmation__header-title">
                Dê match no seu novo amigo de quatro patas.
              </p>
            </div>
            <div className="RegisterConfirmation__forms">
              <h2 className="RegisterConfirmation__forms--title">
                E-mail confirmado com sucesso!
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default RegisterConfirmation;
