
document.getElementById("step1").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  initMap();
});

let map, drawingManager, selectedPolygon;

function initMap() {
  const input = document.getElementById("address-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(["geometry", "formatted_address"]);
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 51.5074, lng: -0.1278 },
    mapTypeId: "satellite",
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["polygon"],
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
    if (selectedPolygon) selectedPolygon.setMap(null);
    selectedPolygon = event.overlay;
    const area = google.maps.geometry.spherical.computeArea(selectedPolygon.getPath());
    document.getElementById("area").value = Math.round(area);
  });

  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    map.setCenter(place.geometry.location);
    map.setZoom(19);
  });
}
