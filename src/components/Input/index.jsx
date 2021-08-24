import { BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { BsEye } from "react-icons/bs";

export function Input({ password, ...rest }) {
  const [type, setType] = useState("password");

  function ChangeIcons(value) {
    setType(value);
  }

  return password === true ? (
    <div className="form-group">
      <input {...rest} type={type} className="form-group__input " />

      {type === "password" ? (
        <BsEye onClick={() => ChangeIcons("text")} />
      ) : (
        <BsEyeSlash onClick={() => ChangeIcons("password")} />
      )}
    </div>
  ) : (
    <div className="form-group">
      <input {...rest} className="form-group__input" />
    </div>
  );
}
