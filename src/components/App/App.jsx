import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

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
  const [userName, setUserName] = useState("Terrence Tegegne");

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
    addClothingItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add new item:", err);
      });
  };

  const handleDeleteItem = (id) => {
    deleteClothingItem(id)
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

  /* React Hooks */
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log(data.name);
        console.log(data.main.temp);
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

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
                <Profile
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  userName={userName}
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
