import { HeaderAdopter } from "../../../components/HeaderAdopter";

import CardAdoption from "../../../components/CardAdoption";

import Permission from "../../../utils/Permission";

function AdoptionRequest() {
  return (
    <>
      <HeaderAdopter />
      <section className="container" id="AdoptionRequest">
        <CardAdoption />
      </section>
    </>
  );
}

export default Permission(["adotante"])(AdoptionRequest);
