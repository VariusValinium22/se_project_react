import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData || !weatherData.condition) {
    return <p>Loading...</p>;
  }

  let normalizedCondition = "";

  if (weatherData && typeof weatherData.condition === "string") {
    normalizedCondition = weatherData.condition.toLowerCase();
  }

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === normalizedCondition
    );
  });

  let weatherOption;
  let showCondition = false;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
    showCondition = true;
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <div className="weather-card__image-container">
        <img
          src={weatherOption.url}
          alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
            weatherOption?.condition
          } weather`}
          className="weather-card__image"
        />
        {showCondition && (
          <p className="weather-card__condition">{weatherData.condition}</p>
        )}
      </div>
    </section>
  );
}

export default WeatherCard;
