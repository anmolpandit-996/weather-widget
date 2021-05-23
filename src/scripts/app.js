let apiKey = "8991320cab517f1c599937a2bb062e87";

function renderCurrentWeatherHTML(weatherObj) {
  const currentConditionEle = document.querySelector(".current-conditions");

  const weatherIcon = weatherObj.weather[0].icon;
  const temp = Math.ceil(weatherObj["main"].temp);
  const weatherDiscription = weatherObj.weather[0].description;

  addCurrentWeatherHTML(
    currentConditionEle,
    weatherIcon,
    temp,
    weatherDiscription
  );
}

function addCurrentWeatherHTML(
  currentConditionEle,
  weatherIcon,
  temp,
  weatherDiscription
) {
  currentConditionEle.innerHTML = "";
  currentConditionEle.innerHTML += `<h2>Current Conditions</h2>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
        <div class="current">
          <div class="temp">${temp}℃</div>
          <div class="condition">${weatherDiscription}</div>
        </div> `;
}

function renderWeatherForecastHTML(weatherArray) {
  const forecastWeatherEle = document.querySelector(".forecast");

  for (i = 0; i <= 40; i++) {
    if (i % 8 === 0) {
      let day = new Date(weatherArray[i].dt_txt).toLocaleDateString("default", {
        weekday: "long",
      });

      const weatherIcon = weatherArray[i].weather[0].icon;
      const tempMax = Math.ceil(weatherArray[i]["main"].temp_max);
      const tempMin = Math.floor(weatherArray[i]["main"].temp_min);
      const weatherDiscription = weatherArray[i].weather[0].description;

      addWeatherForcastHTML(
        forecastWeatherEle,
        day,
        weatherIcon,
        weatherDiscription,
        tempMax,
        tempMin
      );
    }
  }
}

function addWeatherForcastHTML(
  forecastWeatherEle,
  day,
  weatherIcon,
  weatherDiscription,
  tempMax,
  tempMin
) {
  forecastWeatherEle.innerHTML += `
  <div class="day">
  <h3>${day}</h3>
  <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
  <div class="description">${weatherDiscription}</div>
  <div class="temp">
    <span class="high">${tempMax}℃</span>/<span class="low">${tempMin}℃</span>
  </div>
  </div> 
  `;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    getCurrentWeather(position.coords.latitude, position.coords.longitude);
    getWeatherForecast(position.coords.latitude, position.coords.longitude);
  });
}

getLocation();

const getWeatherForecast = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  renderWeatherForecastHTML(data.list);
};

const getCurrentWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  renderCurrentWeatherHTML(data);
};
