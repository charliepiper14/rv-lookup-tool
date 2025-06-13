
let map, drawingManager, selectedShape;

document.getElementById("form-step1").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  initMap();
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: -0.1278 },
    zoom: 14,
  });

  const input = document.getElementById("autocomplete");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    map.setCenter(place.geometry.location);
    map.setZoom(18);
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#ffff00",
      fillOpacity: 0.4,
      strokeWeight: 2,
      strokeColor: "#FF0000",
      clickable: false,
      editable: false,
      zIndex: 1
    }
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    if (selectedShape) selectedShape.setMap(null);
    selectedShape = event.overlay;
    const area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
    document.getElementById("area").value = Math.round(area);
  });
}
