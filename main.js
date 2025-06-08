
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

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        if (event.type === 'rectangle') {
            const bounds = event.overlay.getBounds();
            const NE = bounds.getNorthEast();
            const SW = bounds.getSouthWest();

            const earthRadius = 6378137; // in meters
            const latDiff = NE.lat() - SW.lat();
            const lngDiff = NE.lng() - SW.lng();

            const latDistance = earthRadius * latDiff * Math.PI / 180;
            const lngDistance = earthRadius * Math.cos((NE.lat() + SW.lat()) * Math.PI / 360) * lngDiff * Math.PI / 180;

            const areaSqMeters = Math.abs(latDistance * lngDistance);
            document.querySelector('input[type=number]').value = Math.round(areaSqMeters);
        }
    });
}
