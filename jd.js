// Fetch the weather data for a given location (latitude, longitude)
function getWeather_cards(latitude, longitude) {
  const apiKey = '293ac5c29bda4e809cc43454251209'; // Replace with your API key
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&hour=24`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecastDate = new Date(data.forecast.forecastday[0].date);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = forecastDate.toLocaleDateString('en-US', options);

      // Get the forecast for the next 10 hours
      const hourlyData = data.forecast.forecastday[0].hour.slice(0, 10); // Get only the first 10 hours
      console.log(hourlyData);

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

function getWeather_cards(latitude, longitude, HoursTodisplay = 8) {
  const apiKey = '293ac5c29bda4e809cc43454251209';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=8&hour=1`;
  fetch(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const forecastDate = new Date(data.forecast.forecastday[0].date);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = forecastDate.toLocaleDateString('en-US', options);

      // Get the hourly forecast data for the entire day (24 hours)
      const hourlyData = data.forecast.forecastday[0].hour;
      console.log(hourlyData);

      const hoursToshow = hourlyData.slice(0, HoursTodisplay);
      console.log(hoursToshow);

      const container = document.querySelector('.weather-time_container');
      const forecastdays = data.forecast.forecastday;
      container.innerHTML = '';
      // const h1 = document.createElement('h1');
      // h1.classList.add('weather-header-time');
      // h1.textContent = formattedDate;
      // container.appendChild(h1);

      hoursToshow.forEach((hour) => {
        const weatherCard_inner = document.createElement('div');
        weatherCard_inner.classList.add('weather_time_container-innerH');
        container.appendChild(weatherCard_inner);
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
        console.log(container);
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}
