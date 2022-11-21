function formatDate(today) {
  let currentDay = today.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];

  let currentMonth = today.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentMonth];

  let currentDate = today.getDate();

  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${currentDate} ${month}<br />${hours}:${minutes}`;
}

let today = new Date();
let date = document.querySelector("#date");
date.innerHTML = formatDate(today);

function showWeather(response) {
  let findCity = document.querySelector("#city");
  findCity.innerHTML = response.data.city;
  let findTemp = document.querySelector("#temperature");
  findTemp.innerHTML = Math.round(response.data.temperature.current);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let icon = document.querySelector("#current-weather-icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  celsiusValue = response.data.temperature.current;
}

let celsiusValue = null;

function searchCity(city) {
  let apiKey = "5ed3b347f2ec800oa45b8f8b601dtf4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

searchCity("Abuja");

function submitHere(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchSec = document.querySelector("#search-sec");
searchSec.addEventListener("submit", submitHere);

function getLocation(position) {
  let apiKey = "5ed3b347f2ec800oa45b8f8b601dtf4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", currentLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#temperature");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let fahrenheitTemp = (celsiusValue * 9) / 5 + 32;
  mainTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  event.preventDefault();
  let mainTemp = document.querySelector("#temperature");
  mainTemp.innerHTML = Math.round(celsiusValue);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
