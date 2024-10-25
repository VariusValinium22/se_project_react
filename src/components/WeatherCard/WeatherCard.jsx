import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.condition) {
    return <p>Loading...</p>;
  }

  let normalizedCondition = "";

  if (weatherData && typeof weatherData.condition === "string") {
    normalizedCondition = weatherData.condition.toLowerCase();
    console.log(weatherData.condition);
  }

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === normalizedCondition
    );
  });

  console.log("Filtered options: ", filteredOptions);

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
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
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
