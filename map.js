
let map, drawingManager, selectedRectangle;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 51.5074, lng: -0.1278 },
    mapTypeId: 'satellite'
  });

  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("address")
  );
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) return;
    map.setCenter(place.geometry.location);
    map.setZoom(20);
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['rectangle']
    },
    rectangleOptions: {
      fillColor: "#ffff00",
      fillOpacity: 0.3,
      strokeWeight: 2,
      clickable: false,
      editable: true,
      draggable: true
    }
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
    if (selectedRectangle) selectedRectangle.setMap(null);
    selectedRectangle = rectangle;

    const bounds = rectangle.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const width = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(sw.lat(), sw.lng()),
      new google.maps.LatLng(sw.lat(), ne.lng())
    );
    const height = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(sw.lat(), sw.lng()),
      new google.maps.LatLng(ne.lat(), sw.lng())
    );
    const area = width * height;
    document.getElementById("manual-area").value = Math.round(area);
  });
}

window.initMap = initMap;
