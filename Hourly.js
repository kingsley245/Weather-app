const ctx = document.getElementById('weatherChart').getContext('2d');
const weatherChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Now', '7a', '8a', '9a', '10a', '11a', '12p'], // Time intervals
    datasets: [
      {
        label: 'Weather Intensity',
        data: [0, 0.2, 0.4, 0.5, 0.3, 0.7, 1],
        borderColor: 'rgba(0, 123, 255, 0.7)',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
        tension: 0.4
      }
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
