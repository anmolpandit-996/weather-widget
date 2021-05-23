let cityName = "winnipeg";
let apiKey = "8991320cab517f1c599937a2bb062e87";

function renderCurrentWeatherHTML(weatherObj) {
  const currentConditionEle = document.querySelector(".current-conditions");

  const weatherIcon = weatherObj.weather[0].icon;
  const temp= Math.ceil(weatherObj["main"].temp);
  const weatherDiscription = weatherObj.weather[0].description;

  currentConditionEle.innerHTML = "";
  currentConditionEle.innerHTML += `<h2>Current Conditions</h2>
        <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
        <div class="current">
          <div class="temp">${temp}℃</div>
          <div class="condition">${weatherDiscription}</div>
        </div> `;
}

function renderWeatherForecastHTML(weatherArray){
  const forecastWeatherEle = document.querySelector('.forecast');
 
  for(i=0;i<=40;i++){
    if(i%8===0){
      const day = new Date(weatherArray[i].dt_txt).toLocaleDateString('default',{weekday: 'long'});
  const weatherIcon = weatherArray[i].weather[0].icon;
  const tempMax = Math.ceil(weatherArray[i]["main"].temp_max);
  const tempMin = Math.floor(weatherArray[i]["main"].temp_min);
  const weatherDiscription = weatherArray[i].weather[0].description;
  forecastWeatherEle.innerHTML +=
  `
  <div class="day">
  <h3>${day}</h3>
  <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
  <div class="description">${weatherDiscription}</div>
  <div class="temp">
    <span class="high">${tempMax}℃</span>/<span class="low">${tempMin}℃</span>
  </div>
  </div> 
  `;

    }
  }
}
const getCurrentWeather = async (cityName) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getWeatherForecast = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  const data = response.json();

  return data;
};

getCurrentWeather(cityName).then((data) => {
  renderCurrentWeatherHTML(data);
});

getWeatherForecast(cityName).then((data) => {
  renderWeatherForecastHTML(data.list);
});
