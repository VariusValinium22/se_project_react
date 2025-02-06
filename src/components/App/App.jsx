import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";

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
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, login, checkToken } from "../../utils/auth";

function App() {
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
  const [userName, setUserName] = useState("Terrence Tegegne");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");

  /* Event Handler Functions */
  const handleCardClick = (card) => {
    console.log('Clicked Card: ', card);
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
    register(name, avatar, email, password)
      .then(() => handleLogin(email, password))
      .catch((error) => console.error("Registration failed: ", error));
  };

  const handleLogin = (email, password) => {
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        
        checkToken(res.token)
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((error) => console.error("Falied to fetch user data: ", error));
      })
      .catch((error) => console.error("Login Failed: ", error));
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
        console.log("Fetched Clothing Items:", items);
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
        /* setClothingItems(defaultClothingItems); */
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} />
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
        />
        <LoginModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "login"}
          onLogin={handleLogin}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


