// (() => {

//   console.log('This arrow function runs immediately!');
// })();

navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    updatechat(latitude, longitude);
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

      // Function to format the local time (if needed)
      function formatLocalTime(localtime) {
        const date = new Date(localtime);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options); // Format and return time
      }
    })
    .catch((error) => console.error(`${error}`));
}
