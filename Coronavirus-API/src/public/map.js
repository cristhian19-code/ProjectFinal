mapboxgl.accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuOTktY29kZSIsImEiOiJjazg0dXN4ZnAwMDd3M2xtbjVxOXAyeGxtIn0.y03hIdG27DGx3U1uhD7dtg";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-77.042755, -12.046373],
    zoom: 5
});
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var country_json = JSON.parse(xhttp.responseText);
        var countryString = country_json.data;
        countryString.forEach(data => {
            const element = document.createElement('div');
            element.className = 'marker';
            element.setAttribute('data-toggle', 'popover');
            element.setAttribute('data-content', `<p class="text-center">${data.country}</p><p>Confirmed : ${data.confirmed}</p><p>Recovered : ${data.recovered}</p><p>Deaths : ${data.deaths}</p>`);
            element.setAttribute('data-container', 'body');
            element.setAttribute('data-placement', 'bottom');
            $(function() {
                $('.marker').popover({ trigger: "hover", html: true });
            });
            let marker = new mapboxgl.Marker(element).setLngLat({ lng: data.longitude, lat: data.latitude }).addTo(map);
        });
    }
};
xhttp.open("GET", "./db.json", true);
xhttp.send();