import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ closeActiveModal, isOpen, handleAddItemSubmit }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeather] = useState("hot");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weather) {
      alert("Please select a weather type!");
      return;
    }
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="additem-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          id="additem-name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          autoComplete="name"
        />
      </label>
      <label htmlFor="additem-imageUrl" className="modal__label">
        Image{" "}
        <input
          type="Url"
          className="modal__input"
          id="additem-imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weatherTemp"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weatherTemp"
            value="warm"
            onChange={handleWeatherChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weatherTemp"
            value="cold"
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
