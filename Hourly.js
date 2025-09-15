// (() => {

//   console.log('This arrow function runs immediately!');
// })();

navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    updatechat(latitude, longitude);
    getWeather_cards_Hourly(latitude, longitude, 9);
  },
  function (error) {
    console.log('Error getting location:', error);
  }
);

function updatechat(latitude, longitude, hoursTo = 8) {
  const api = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${latitude},${longitude}`;

  const ctx = document.getElementById('weatherChart').getContext('2d');
  const weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // Time intervals
      datasets: [
        {
          label: 'Weather Intensity',
          data: [0, 0.2, 0.4, 0.5, 0.3, 0.7, 1],
          borderColor: 'rgba(0, 123, 255, 0.7)',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          fill: true,
          tension: 0.4
        }
        //   {
        //     label: 'Weather Intensity',
        //     data: [0, 0.2, 0.4, 0.5, 0.3, 0.7, 1],
        //     borderColor: 'rgba(0, 123, 255, 0.7)',
        //     backgroundColor: 'rgba(0, 123, 255, 0.2)',
        //     fill: true,
        //     tension: 0.4
        //   }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Intensity'
          },
          min: 0,
          max: 1
        }
      }
    }
  });

  fetch(url)
    .then((res) => res.json())
    .then((data_response) => {
      const forecastHours = data_response.forecast.forecastday[0].hour;

      const labels = [];
      const temperatureData = [];
      const rainData = [];

      forecastHours.slice(0, hoursTo).forEach((hour) => {
        labels.push(
          new Date(hour.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        );
        temperatureData.push(hour.temp_c);
        rainData.push(hour.chance_of_rain);
      });
      weatherChart.data.labels = labels;
      // console.log(weatherChart.data.datasets[0]);
      weatherChart.data.datasets[0];
      weatherChart.data.datasets[1];

      weatherChart.update();
      const location = data_response.location;

      const weather = data_response.current;

      const weatherLocation = document.querySelector(
        '.Hourly_weather p:nth-of-type(1)'
      );
      const weatherTime = document.querySelector(
        '.Hourly_weather p:nth-of-type(2)'
      );
      const weatherForecast = document.querySelector(
        '.Hourly_weather p:nth-of-type(3)'
      );

      weatherLocation.innerHTML = `<span>Hourly Weather </span>- ${location.name}, ${location.region}, ${location.country}`;
      weatherTime.innerHTML = `As of ${formatLocalTime(
        location.localtime
      )} WAT`;
      weatherForecast.innerHTML = `<span>${weather.condition.text} after 11 AM.</span>`;

      function formatLocalTime(localtime) {
        const date = new Date(localtime);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options);
      }
    })
    .catch((error) => console.error(`${error}`));
}

function getWeather_cards_Hourly(latitude, longitude, HoursTodisplay = 9) {
  const apiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=12`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector('.weather-time_container');
      container.innerHTML = '';

      // Loop through the forecast days
      const forecastday = data.forecast.forecastday;
      forecastday.forEach((day) => {
        // Getting the formatted date for the header
        const forecastDate = new Date(day.date);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = forecastDate.toLocaleDateString('en-US', options);

        const weatherCard_inner = document.createElement('div');
        weatherCard_inner.classList.add('weather_time_container-innerH');
        container.appendChild(weatherCard_inner);

        const Weather_header_time = document.createElement('h1');
        Weather_header_time.classList.add('weather-header-time');
        Weather_header_time.style.fontSize = '20px'; // Set the font size directly
        Weather_header_time.textContent = formattedDate;
        weatherCard_inner.appendChild(Weather_header_time);

        // Loop through the hours for this day
        const hours = day.hour || [];
        hours.slice(0, HoursTodisplay).forEach((hour) => {
          const weatherCard = document.createElement('div');
          weatherCard.classList.add('weather-line-item');
          weatherCard_inner.appendChild(weatherCard);

          const button = document.createElement('button');
          button.classList.add('weather-card-pieses');
          button.setAttribute('onclick', 'toggleAnswer(this)');

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

          weatherCard_inner.appendChild(button);

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

          weatherCard_inner.appendChild(weatherDetails);
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}
