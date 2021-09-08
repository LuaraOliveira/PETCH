import { BsEyeSlash } from "react-icons/bs";
import { useState, forwardRef } from "react";
import { BsEye } from "react-icons/bs";

export const Input = forwardRef(({ password, ...rest }, ref) => {
  const [type, setType] = useState("password");

  function ChangeIcons(value) {
    setType(value);
  }

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
      <input ref={ref} {...rest} className="form-group__input" />
    </div>
  );
});
