import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ closeActiveModal, isOpen, onRegister }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, avatar, email, password);
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="modal__label">
        Avatar URL
        <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />
      </label>
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

export default RegisterModal;
