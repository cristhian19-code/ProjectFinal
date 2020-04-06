const map = L.map('map-template').setView([-10.4616389, -75.3682559], 6); //configuracion basica {position,zoom}
const socket = io.connect(); //haciendo conexion socket

L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); //agregando estilo al mapa

map.locate({ enableHighAccuracy: true }); //verificando se accede a la API de geolocalizacion

map.on('locationfound', e => {
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map) //agregando la posicion del usuario actual
    marker.bindPopup('You are Here');
    map.addLayer(marker);
    socket.emit('recived', e.latlng);
});

socket.on('send', (coords) => {
    console.log('new User');
    const marker = L.marker([coords.lat, coords.lng]).addTo(map) //agregando la posicion de manera global
    marker.bindPopup('Helle There'); //agregando un estilo al marcado
    map.addLayer(marker); //agregando el marcador al mapa
});