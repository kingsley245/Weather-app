var map = L.map('map').setView([4.82, 7.01], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var radarLayer = L.tileLayer(
  'https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/2/1_1.png',
  {
    attribution: 'RainViewer.com',
    opacity: 0.6
  }
).addTo(map);

setInterval(() => {
  radarLayer.setUrl(
    'https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/2/1_1.png?time=' +
      new Date().getTime()
  );
}, 100000);

map.locate({ setView: true, maxZoom: 10 });

map.on('locationfound', function (e) {
  L.marker(e.latlng).addTo(map).bindPopup(' You are here').openPopup();
});

map.on('locationerror', function () {
  alert('⚠️ Location access denied.');
});
