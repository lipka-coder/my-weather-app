let currentDate = new Date();
let h5 = document.querySelector("#day-time");
let h6 = document.querySelector("#month-day-number");

let date = currentDate.getDate();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentDate.getMonth()];
h5.innerHTML = `${day}, ${hours}:${minutes}`;
h6.innerHTML = `${month} ${date}`;


function showWeather(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let cityName = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("h3");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;  
  
  temperature.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function searchCity(city) {
  let apiKey = "08c89d7c2dd394c882a212087337db19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  searchCity(city);
}
let typeCity = document.querySelector("form");
typeCity.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "08c89d7c2dd394c882a212087337db19";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Warsaw");
//function searchCity(event) {
// event.preventDefault();
//let cityInput = document.querySelector("#type-city");
//let cityElement = document.querySelector("#city-name");
//cityElement.innerHTML = cityInput.value;
//}
//let currentCity = document.querySelector("form");
//currentCity.addEventListener("submit", searchCity);


