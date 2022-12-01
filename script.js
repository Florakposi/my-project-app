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

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "5ed3b347f2ec800oa45b8f8b601dtf4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

searchCity("Abuja");

function getForecast(coordinates) {
  let apiKey = "5ed3b347f2ec800oa45b8f8b601dtf4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function submitHere(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchSec = document.querySelector("#search-sec");
searchSec.addEventListener("submit", submitHere);

function getLocation(position) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", currentLocation);

function changeDay(date) {
  let currentDate = new Date(date * 1000);
  let day = currentDate.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;

  let forcast = document.querySelector("#weather-forcast");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
              ${changeDay(forecastDay.time)}
              <br />
              <span class="icon">
                <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt=""
            id="daily-forecast-icon"
            class="float-center"
          />
              </span>
              <br />
              ${Math.round(forecastDay.temperature.day)}°
        </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forcast.innerHTML = forecastHTML;
}
