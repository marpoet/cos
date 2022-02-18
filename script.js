// Klucz z OpenWeather.com
const API_KEY = "438e07de187dc7a129d99ab778e9f57d";
const cityName = document.getElementById("CityName");
const cloudsBar = document.getElementById("Clouds");
const humidityBar = document.getElementById("Humidity");

//Drugi krok: Pobieramy informacje o pogodzie w naszej obecnej lokalizacji
const showWeatherByLocation = (pos) => {
  const coords = pos.coords;
  console.log(pos);
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => weatherInfo(res))
    .catch((err) => console.log(err))
    .finally(() => console.log("Kończe działanie wynikiem ......"));
};

// Trzeci krok: Wyświetlamy przechwycone informacje na stronie
const weatherInfo = (info) => {
  const { clouds, coord, main, sys, weather, wind, name } = info;

  console.log(info);

  cityName.textContent = convertToCelsius(main.temp) + "°C";

  // Progress bars z informacjami o zachmurzeniu i wilgotności
  cloudsBar.value = clouds.all;
  humidityBar.value = main.humidity;
};

// Pierwszy krok: informacje o naszej szerokości geograficznej i wywołanie funkcji
//showWeatherByLocation
const getMyLocation = () => {
  navigator.geolocation.getCurrentPosition((pos) => showWeatherByLocation(pos));
};
getMyLocation();

// konwertujemy temperaturę
const convertToCelsius = (temp) => Math.round(temp - 273.15);
