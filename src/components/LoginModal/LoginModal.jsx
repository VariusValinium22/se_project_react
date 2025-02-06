import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ closeActiveModal, isOpen, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="modal__label">
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
