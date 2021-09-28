import { BsEyeSlash } from "react-icons/bs";
import { useState, forwardRef } from "react";
import { BsEye } from "react-icons/bs";
import { cep, cpf, birthday, cnpj, phone } from "./mask";
export const Input = forwardRef(({ password, mask, ...rest }, ref) => {
  const [type, setType] = useState("password");

  function ChangeIcons(value) {
    setType(value);
  }

  const value =
    mask === "cpf"
      ? cpf(rest.value)
      : mask === "cep"
      ? cep(rest.value)
      : mask === "birthday"
      ? birthday(rest.value)
      : mask === "cnpj"
      ? cnpj(rest.value)
      : mask === "phone"
      ? phone(rest.value)
      : rest.value;
  return password === true ? (
    <div className="form-group">
      <input ref={ref} {...rest} type={type} className="form-group__input " />

      {type === "password" ? (
        <BsEye onClick={() => ChangeIcons("text")} />
      ) : (
        <BsEyeSlash onClick={() => ChangeIcons("password")} />
      )}
    </div>
  ) : (
    <div className="form-group">
      <input ref={ref} {...rest} className="form-group__input" value={value} />
    </div>
  );
});
