import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteItem }) {
  const handleDelete = () => {
    handleDeleteItem(card._id);
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={close}
            alt="close"
            className="modal__image modal__image_small_x"
          />
        </button>
        <img
          src={card.imageUrl}
          alt="Item Image"
          className="modal__image__item"
        />

        <div className="modal__footer">
          <div className="modal__caption-and-delete_button">
            <h2 className="modal__caption">{card.name}</h2>
            <button className="modal__delete_button" onClick={handleDelete}>
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
