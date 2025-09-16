import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import * as api from "../../utils/api";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, login, checkToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function App() {
  console.log(import.meta.env.PROD);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");
  const navigate = useNavigate();

  /* Event Handler Functions */
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    addClothingItem(item, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add new item:", error);
      });
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteClothingItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleRegister = (name, avatar, email, password) => {
    setIsLoading(true);
    return register(name, avatar, email, password)
      .then(() => handleLogin(email, password))
      .then(() => closeActiveModal())
      .catch((error) => {
        console.error("Registration failed: ", error);
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    return login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log(error))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log(error));
  };

  /* React Hooks */
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to get the weather item:", error);
      });
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) closeActiveModal();
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [activeModal, closeActiveModal]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    component={Profile}
                    isLoggedIn={isLoggedIn}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                    setActiveModal={setActiveModal}
                    onCardLike={handleCardLike}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogOut={handleLogOut}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            setActiveModal={setActiveModal}
            isLoading={isLoading}
          />
          <LoginModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            setActiveModal={setActiveModal}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={setCurrentUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
