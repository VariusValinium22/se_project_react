import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  closeActiveModal,
  isOpen,
  onRegister,
  setActiveModal,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !avatar || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    onRegister(name, avatar, email, password)
      .then(() => setErrorMessage(""))
      .catch((error) => {
        console.error("Registration Error:", error);
        setErrorMessage("Registration failed. Please try again.");
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      toggleModal={() => setActiveModal("login")}
      toggleText="or Log In"
    >
      <label htmlFor="register-name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          id="register-name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          disabled={isLoading}
          required
        />
      </label>
      <label htmlFor="register-imageUrl" className="modal__label">
        Avatar URL *{" "}
        <input
          type="url"
          id="register-imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email *{" "}
        <input
          type="email"
          id="register-email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={isLoading}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        {errorMessage ? (
          <p className="modal__error">{errorMessage}</p>
        ) : (
          <p>Password *</p>
        )}
        <input
          type="password"
          id="register-password"
          className={`modal__input ${errorMessage && "modal__input_error"}`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
