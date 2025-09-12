navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  },
  function (error) {
    console.log('Error getting location:', error);
  }
);

function getWeather(latitude, longitude) {
  const apiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log('Weather Data:', data);
      const weather = data.current;
      const location = data.location;
      const forecast = data.forecast.forecastday[0].day;
      console.log(weather);

      const DayTemperature = forecast.avgtemp_c;
      const NightTemperature = forecast.mintemp_c;
      const weatherCard = document.getElementById('weather-card');
      weatherCard.innerHTML = `<div class="weather-header">
    <p>${location.name}, ${location.region}, ${location.country}</p>
    <p>As of ${location.localtime}</p>
  </div>
  <!-- main weather condition -->
  <div class="weather-main">
    <div>
      <div class="temp">
        ${weather.temp_c}°
        <img src="${weather.condition.icon}" alt="${weather.condition.text}" />
      </div>
      <div class="condition">${weather.condition.text}</div>
      <div class="details">${DayTemperature}° • Night ${NightTemperature}°</div>
    </div>
  </div>
  <div class="watch-btn">
    <span>▶</span>
    Watch: Mesmerizing Monsoon Storm At Sunset
  </div>`;
    })
    .catch((error) => console.log('Error fetching weather data:', error));
}
