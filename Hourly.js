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

function updatechat(latitude, longitude, hoursTo) {
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
    .then((data) => {
      console.log(data);
      const forecastHours = data.forecast.forecastday[0].hour;
      console.log(forecastHours);
      const labels = [];
      const temperatureData = [];
      const rainData = [];

      forecastHours.forEach((hour) => {
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
      weatherChart.data.datasets[0].data = temperatureData;
      weatherChart.data.datasets[1].data = rainData;

      weatherChart.update();
    })
    .catch((error) => console.error(`this is the ${error}`));
}
