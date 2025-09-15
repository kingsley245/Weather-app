navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeatherDay10(latitude, longitude);
  },
  function (error) {
    console.log('Error getting location:', error);
  }
);

function getWeatherDay10(latitude, longitude, HoursTodisplay = 9) {
  const apiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const forecastday = data.forecast.forecastday[0];
      const data_day = forecastday.day;
      const data_night = forecastday.night;

      console.log(`data day:${data_day} and data night:${data_night}`);
    });
}

alert('Day10.js loaded function was not complete ');
