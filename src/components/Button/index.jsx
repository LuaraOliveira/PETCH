import { AiOutlineClose } from "react-icons/ai";

export function Button({
  color = "primary",
  children,
  className,
  showIcon = false,
  ...rest
}) {
  return (
    <button
      className={`c-button c-button--${color} ${className ? className : ""}`}
      {...rest}
    >
      {showIcon && (
        <AiOutlineClose
          className={`c-button__icon ${
            children ? "c-button__icon--small" : ""
          }`}
        />
      )}
      {children}
    </button>
  );
}
