mapboxgl.accessToken = "sk.eyJ1IjoiY2hyaXN0aWFuOTktY29kZSIsImEiOiJjazg1MHAyb2gwMXlkM2ZwOG55cHo5eTlyIn0.jcrHVUWvgyOO3ZeXmHHcSA";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-77.042755, -12.046373],
    zoom: 5
});

const element = document.createElement('div');
element.className = 'marker';
element.setAttribute('data-toggle', 'popover');
element.setAttribute('data-content', 'hola que tal');
element.setAttribute('data-container', 'body');
element.setAttribute('data-placement', 'bottom');
$(function() {
    $('.marker').popover({ trigger: "hover" });
});

let marker = new mapboxgl.Marker(element).setLngLat({ lng: -77.042755, lat: -12.046373 }).addTo(map);