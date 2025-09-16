navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeatherDay10(latitude, longitude);
    getWeatherDay102(latitude, longitude, 9);
    getWeatherFullForecast(latitude, longitude);
  },
  function (error) {
    console.log('Error getting location:', error);
  }
);

function getWeatherDay10(latitude, longitude, HoursTodisplay = 9) {
  const apiKey = '727876eaf749c78e4a4bb74db1e1f7ef';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

alert('Day10.js loaded function was not complete ');

function getWeatherDay102(latitude, longitude, HoursTodisplay = 9) {
  const apiKey = '727876eaf749c78e4a4bb74db1e1f7ef';
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&units=metric&appid=${apiKey}
`;

  fetch(url)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data); // Log the full response to the console
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function getWeatherFullForecast(latitude, longitude) {
  const apiKey = '727876eaf749c78e4a4bb74db1e1f7ef';
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data); // Log the full response
      // You can loop through the daily data to get each day's hourly data
      data.daily.forEach((day, index) => {
        console.log(`Day ${index + 1}:`);
        console.log(`Max Temp: ${day.temp.max}°C, Min Temp: ${day.temp.min}°C`);
        day.hourly.forEach((hour, hourIndex) => {
          const hourTime = new Date(hour.dt * 1000).toLocaleTimeString();
          console.log(
            `  ${hourTime}: Temp: ${hour.temp}°C, Weather: ${hour.weather[0].description}`
          );
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}
