$(function() {
    mapboxgl.accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuOTktY29kZSIsImEiOiJjazg0dXN4ZnAwMDd3M2xtbjVxOXAyeGxtIn0.y03hIdG27DGx3U1uhD7dtg";
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/christian99-code/ck84ub5lx092q1iqqor86y15a',
        center: [-77.042755, -12.046373],
        zoom: 5
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            const coronavirus = response.Departamentos;

            for (var i = 0; i < coronavirus.length; i++) {

                const element = document.createElement('div');
                element.className = "marker";
                element.setAttribute('data-toggle', 'popover');
                element.setAttribute('data-content',
                    `<p class="text-center">${coronavirus[i].departamento}</p><p>N° casos positivos : ${coronavirus[i].positivos}</p><p>N° de fallecidos : ${coronavirus[i].fallecidos}</p><p>N° casos recuperados : ${coronavirus[i].recuperados}</p>`);
                element.setAttribute('data-container', 'body');
                element.setAttribute('data-placement', 'bottom');

                new mapboxgl.Marker(element).setLngLat(coronavirus[i].position).addTo(map);
                $('.marker').popover({
                    trigger: "hover",
                    html: true
                });
            }
        }
    };
    xhttp.open("GET", "db.json", true);
    xhttp.send();
})