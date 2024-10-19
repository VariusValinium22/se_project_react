import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">Today is 75° F / You may want to wear:</p>
        {/* TODO - add the cards */}
      </section>
    </main>
  );
}

export default Main;
