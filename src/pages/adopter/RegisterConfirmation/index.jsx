import logo from "../../../assets/logo/logo-white.png";
import { useState, useEffect } from "react";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";

function RegisterConfirmation() {
  const history = useHistory();
  useEffect(() => {
    async function confirmationEmail() {
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const token = params.get("token");
      const email = params.get("email");
      console.log(token, email);
      try {
        await api.patch(`/users/confirm?token=${token}&email=${email}`);
      } catch (error) {
        console.log(error.response);
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
              <h2 className="RegisterConfirmation__forms--title"></h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default RegisterConfirmation;
