import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button onClick={handleCloseClick} type="button" className="modal__close">
            <img src={close} alt="close" className="modal__image" />
          </button>
        </div>
        <form className="modal__form">
          {children}
          <div className="modal__submit_container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
