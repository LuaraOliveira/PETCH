import { BsXCircle } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
export function Alert(props) {
  return (
    <>
      <div className={`Alert Alert--${props.background}`}>
        <div className="Alert__container">
          <div className="Alert__text">
            {props.background === "success" ? (
              <AiOutlineCheckCircle />
            ) : (
              <BsXCircle />
            )}

            {props.children}
          </div>

          <BsXCircle onClick={props.onClick} />
        </div>
      </div>
    </>
  );
}
