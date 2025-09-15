navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
    getWeather_cards(latitude, longitude);
    loadScript(latitude, longitude);
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

function getWeather_cards(latitude, longitude, HoursTodisplay = 8) {
  const apiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=8&hour=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Get the forecast data for the first day
      const forecastDate = new Date(data.forecast.forecastday[0].date);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = forecastDate.toLocaleDateString('en-US', options);

      // Get the hourly data for the first day
      const hourlyData = data.forecast.forecastday[0].hour;
      console.log(hourlyData);

      // Limit the hourly data to the specified number of hours (default 8)
      const hoursToshow = hourlyData.slice(0, HoursTodisplay);
      console.log(hoursToshow);

      // Get the container where we will display the weather cards
      const container = document.querySelector('.weather-time_container');
      container.innerHTML = ''; // Clear any existing content

      hoursToshow.forEach((hour) => {
        const weatherCard_inner = document.createElement('div');
        weatherCard_inner.classList.add('weather_time_container-innerH');
        container.appendChild(weatherCard_inner);

        // Display the formatted date
        const Weather_header_time = document.createElement('h1');
        Weather_header_time.classList.add('weather-header-time');
        Weather_header_time.textContent = formattedDate;
        weatherCard_inner.appendChild(Weather_header_time);

        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-line-item');
        weatherCard_inner.appendChild(weatherCard);

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

        // Temperature
        const temperature = document.createElement('span');
        temperature.textContent = `${hour.temp_c}°`;
        button.appendChild(temperature);

        // Weather icon
        const icon = document.createElement('img');
        icon.src = `https:${hour.condition.icon}`;
        icon.alt = hour.condition.text;
        button.appendChild(icon);

        // Rain chance
        const percentage = document.createElement('div');
        percentage.classList.add('weather-time-percentage');
        percentage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
            <path d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z"></path>
          </svg>
          <span>${hour.chance_of_rain}%</span>
        `;
        button.appendChild(percentage);

        // Add the toggle button to the card
        weatherCard_inner.appendChild(button);

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
        weatherCard_inner.appendChild(weatherDetails);

        // Append the weather card to the container
        container.appendChild(weatherCard_inner);
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function getWeather_cards(latitude, longitude, HoursTodisplay = 6) {
  const apiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=8`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.forecast.forecastday); // Check the hourly data of the first day

      // Get the container where the weather cards will be appended
      const container = document.querySelector('.weather-time_container');
      container.innerHTML = ''; // Clear any existing content

      // Loop through the forecast days
      const forecastday = data.forecast.forecastday;
      forecastday.forEach((day, dayIndex) => {
        console.log(`Day ${dayIndex + 1} - Hourly Data:`, day.hour);
        // Get the formatted date for the header
        const forecastDate = new Date(day.date);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = forecastDate.toLocaleDateString('en-US', options);

        // Create the weather header for the day
        const weatherCard_inner = document.createElement('div');
        weatherCard_inner.classList.add('weather_time_container-innerH');
        container.appendChild(weatherCard_inner);

        const Weather_header_time = document.createElement('h1');
        Weather_header_time.classList.add('weather-header-time');
        Weather_header_time.textContent = formattedDate;
        weatherCard_inner.appendChild(Weather_header_time);

        // Loop through the hours for this day
        const hours = day.hour || [];
        hours.slice(0, HoursTodisplay).forEach((hour) => {
          const weatherCard = document.createElement('div');
          weatherCard.classList.add('weather-line-item');
          weatherCard_inner.appendChild(weatherCard);

          // Create the button for each hour
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

          // Temperature
          const temperature = document.createElement('span');
          temperature.textContent = `${hour.temp_c}°`;
          button.appendChild(temperature);

          // Weather icon
          const icon = document.createElement('img');
          icon.src = `https:${hour.condition.icon}`;
          icon.alt = hour.condition.text;
          button.appendChild(icon);

          // Rain chance
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
          weatherCard_inner.appendChild(button);

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
          weatherCard_inner.appendChild(weatherDetails);

          // container.appendChild(weatherCard_inner);
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function loadScript(latitude, longitude) {
  const apiKey = '293ac5c29bda4e809cc43454251209';

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('Full Response:', data); // Log the full response for inspection
      const forecastDays = data.forecast.forecastday;
      forecastDays.forEach((day, index) => {
        console.log(`Day ${index + 1}:`, day.hour); // Log the hours for each day
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}
