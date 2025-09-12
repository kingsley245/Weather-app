navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
    getWeather_cards(latitude, longitude);
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
      console.log(data.forecast.forecastday);

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

      const weather__cuurent = document.querySelector('.weather-card_Current');
      weather__cuurent.innerHTML = ` <div class="weather-header_Current">
      <h2>Weather Today in ${location.name}, ${location.region}, ${location.country}</h2>
      <h1>${weather.temp_c}°</h1>
      <!-- <p>Feels Like</p> -->
    </div>

    <div class="flex">
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1684/1684375.png"
          alt="temperature"
        />
        <span>High/Low: ${forecast.maxtemp_c}° / ${forecast.mintemp_c}°</span> 
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4005/4005901.png"
          alt="humidity"
        />
        <span>Humidity: ${weather.humidity}%</span>
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          alt="pressure"
        />
        <span>Pressure: ${weather.pressure_in} in</span>
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          alt="visibility"
        />
        <span>Visibility: ${weather.vis_km} mi</span>
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/553/553416.png"
          alt="wind"
        />
        <span>Wind: ${weather.wind_kph} mph</span>
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/481/481472.png"
          alt="dew point"
        />
        <span>Dew Point:${weather.dewpoint_c}°</span>
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          alt="uv index"
        />
        <span>UV Index:${weather.uv}</span>
      </div>
      <div class="item">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
          alt="moon phase"
        />
        <span>Moon Phase: Full Moon</span>
      </div>
    </div>`;
    })

    .catch((error) => console.log('Error fetching weather data:', error));
}

let map, userMarker;

// Initialize map
function initMap(latitude, longitude) {
  map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add user marker
  userMarker = L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup('Your Location')
    .openPopup();
}

// Function to update radar data
function updateWeatherData(latitude, longitude) {
  const weatherApiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${latitude},${longitude}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => console.error('Error fetching weather data:', error));
}

function startLiveUpdates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      if (!map) {
        initMap(latitude, longitude);
      } else {
        map.setView([latitude, longitude], 13);
        userMarker.setLatLng([latitude, longitude]);
      }

      updateWeatherData(latitude, longitude);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

startLiveUpdates();
setInterval(startLiveUpdates, 100000);

navigator.geolocation.getCurrentPosition(function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeather(lat, lon);
});

// Fetch the weather data for a given location (latitude, longitude)
function getWeather_cards(latitude, longitude) {
  const apiKey = '293ac5c29bda4e809cc43454251209'; // Replace with your API key
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&hour=10`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecastDate = new Date(data.forecast.forecastday[0].date);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = forecastDate.toLocaleDateString('en-US', options);

      // Get the forecast for the next 10 hours
      const hourlyData = data.forecast.forecastday[0].hour.slice(0, 10); // Get only the first 10 hours

      // Get the container to insert the cards
      const container = document.querySelector('.weather-time_container');
      container.innerHTML = ''; // Clear any existing content

      // Iterate over the hourly data and create the weather cards
      hourlyData.forEach((hour) => {
        const h1 = document.createElement('h1');
        h1.classList.add('weather-header-time');
        h1.textContent = formattedDate;
        container.appendChild(h1);
        // Create a new div for each hourly weather card
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-line-item');

        // Create the button for toggling weather details
        const button = document.createElement('button');
        button.classList.add('weather-card-pieses');
        button.setAttribute('onclick', 'toggleAnswer(this)');

        // Time (e.g., 9pm)
        const time = document.createElement('span');
        time.textContent = new Date(hour.time).toLocaleString('en-us', {
          hour: 'numeric',
          hour12: true
        });
        button.appendChild(time);

        const temperature = document.createElement('span');
        temperature.textContent = `${hour.temp_c}°`;
        button.appendChild(temperature);

        // Weather icon
        const icon = document.createElement('img');
        icon.src = `https:${hour.condition.icon}`;
        icon.alt = hour.condition.text;
        button.appendChild(icon);

        // Weather percentage (e.g., rain chance)
        const percentage = document.createElement('div');
        percentage.classList.add('weather-time-percentage');
        percentage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
            <path d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z"></path>
          </svg>
          <span>${hour.chance_of_rain}%</span>
        `;
        button.appendChild(percentage);
        const i_class = document.createElement('i');
        i_class.classList.add('fas', 'fa-plus');
        button.appendChild(i_class);

        // Add the toggle button to the card
        weatherCard.appendChild(button);

        // Create the weather details section
        const weatherDetails = document.createElement('div');
        weatherDetails.classList.add('weather-card-togle_answer');
        weatherDetails.innerHTML = `
          <h3>${hour.condition.text}</h3>
          <div class="weather-grid">
            <div class="weather-item_list-items">
              <i class="fas fa-temperature-high"></i>
              <div>
                <p>Feels Like</p>
                <strong>${hour.feelslike_c}°</strong>
              </div>
            </div>

            <div class="weather-item_list-items">
              <i class="fas fa-wind"></i>
              <div>
                <p>Wind</p>
                <strong>${hour.wind_kph} km/h</strong>
              </div>
            </div>

            <div class="weather-item_list-items">
              <i class="fas fa-tint"></i>
              <div>
                <p>Humidity</p>
                <strong>${hour.humidity}%</strong>
              </div>
            </div>

            <div class="weather-item_list-items">
              <i class="fas fa-sun"></i>
              <div>
                <p>UV Index</p>
                <strong>${hour.uv}</strong>
              </div>
            </div>

            <div class="weather-item_list-items">
              <i class="fas fa-cloud"></i>
              <div>
                <p>Cloud Cover</p>
                <strong>${hour.cloud}%</strong>
              </div>
            </div>

            <div class="weather-item_list-items">
              <i class="fas fa-cloud-rain"></i>
              <div>
                <p>Rain Amount</p>
                <strong>${hour.precip_in} in</strong>
              </div>
            </div>
          </div>
        `;
        // Append the weather details to the card
        weatherCard.appendChild(weatherDetails);

        // Append the weather card to the container
        container.appendChild(weatherCard);
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

// getWeather_cards();
