export function Select({ id, name, children, message, className, ...rest }) {
  return (
    <div className={`container-component ${className ? className : ""}`}>
      {message && (
        <label className="container-component__label" htmlFor={id}>
          {message}
        </label>
      )}

      <select className="container-component__select" name={name} {...rest}>
        {children}
      </select>
    </div>
  );
}
