import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "/src/assets/logo2.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  openRegisterModal,
  openLoginModal,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  console.log("🔵 Header.jsx: Current User Context:", currentUser);

  if (!isLoggedIn) {
    console.warn("🔴 User is not logged in, hiding profile details.");
  }

  if (!currentUser || !currentUser.name) {
    console.warn("🔴 currentUser is missing in Header:", currentUser);
  }

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Header Logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      {!isLoggedIn && (
        <>
          <button onClick={openLoginModal} className="header__auth-btn">
            Log In
          </button>
          <button onClick={openRegisterModal} className="header__auth-btn">
            Register
          </button>
        </>
      )}

      {isLoggedIn && currentUser && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="{currentUser.name}"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {getInitials(currentUser.name)}
              </div>
            )}
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
