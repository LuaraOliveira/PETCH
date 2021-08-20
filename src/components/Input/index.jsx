import { BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { BsEye } from "react-icons/bs";

export function Input(props) {
  const [type, setType] = useState("password");

  function ChangeIcons(value) {
    setType(value);
  }

  return props.password ? (
    <div className="form-group">
      <input {...props} type={type} className="form-group__input " />
      {/* <label htmlFor={props.id} className="form-group__label">
        {props.label}
      </label> */}
      {type === "password" ? (
        <BsEye onClick={() => ChangeIcons("text")} />
      ) : (
        <BsEyeSlash onClick={() => ChangeIcons("password")} />
      )}
    </div>
  ) : (
    <div className="form-group">
      <input {...props} className="form-group__input" />
      {/* <label htmlFor={props.id} className="form-group__label">
        {props.label}
      </label> */}
    </div>
  );
}
