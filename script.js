// Initialize map
var map = L.map('map').setView([4.82, 7.01], 6); // Default to Port Harcourt

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add RainViewer radar layer
var radarLayer = L.tileLayer(
  'https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/2/1_1.png',
  {
    attribution: 'RainViewer.com',
    opacity: 0.6
  }
).addTo(map);

// Refresh radar every 5 minutes
setInterval(() => {
  radarLayer.setUrl(
    'https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/2/1_1.png?time=' +
      new Date().getTime()
  );
}, 300000); // 300,000 ms = 5 minutes

// Try to locate the user's current position
map.locate({ setView: true, maxZoom: 10 });

// When location is found
map.on('locationfound', function (e) {
  L.marker(e.latlng).addTo(map).bindPopup(' You are here').openPopup();
});

// If location access is denied
map.on('locationerror', function () {
  alert('⚠️ Location access denied.');
});

function toggleAnswer(card) {
  const answer = card.nextElementSibling;
  const allAnswers = document.querySelectorAll('.weather-card-togle_answer');
  const allIcons = document.querySelectorAll('.weather-card-pieses i');

  allAnswers.forEach((el, index) => {
    if (el !== answer) {
      el.classList.remove('show');
      allIcons[index].classList.remove('fa-minus');
      allIcons[index].classList.add('fa-plus');
    }
  });

  if (!answer.classList.contains('show')) {
    answer.classList.add('show');
    card.querySelector('i').classList.remove('fa-plus');
    card.querySelector('i').classList.add('fa-minus');
  } else {
    answer.classList.remove('show');
    card.querySelector('i').classList.remove('fa-minus');
    card.querySelector('i').classList.add('fa-plus');
  }
}

// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.onscroll = function () {
  const scrollBtn = document.querySelector('.scroll-up-btn');
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollBtn.style.right = '30px';
  } else {
    scrollBtn.style.right = '-60px';
  }
};
