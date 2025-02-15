import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { use } from "react";

const LoginModal = ({ closeActiveModal, isOpen, onLogin, setActiveModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
    await onLogin(email, password);
    closeActiveModal();
    } catch (error) {
      setErrorMessage("Incorrect password");
    }    
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      toggleModal={() => setActiveModal("register")}
      toggleText="or Sign Up"
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="password" className={`modal__label ${errorMessage ? "modal__label-error" : ""}`}>
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
