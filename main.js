
function showStep2() {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    initMap();
}

function initMap() {
    const defaultCenter = { lat: 51.5074, lng: -0.1278 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: defaultCenter,
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ["rectangle"],
        },
    });
    drawingManager.setMap(map);

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);
        }
    });
}
