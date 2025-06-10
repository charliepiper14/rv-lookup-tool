let map, drawingManager, selectedShape;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: { lat: 51.5074, lng: -0.1278 },
    mapTypeId: "satellite",
  });

  const input = document.getElementById("address");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) return;
    map.panTo(place.geometry.location);
    map.setZoom(19);
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      strokeWeight: 2,
      clickable: false,
      editable: false,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
    if (selectedShape) selectedShape.setMap(null);
    selectedShape = event.overlay;
    const area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
    document.getElementById("area").value = Math.round(area);
  });

  document.getElementById("clearArea").addEventListener("click", () => {
    if (selectedShape) selectedShape.setMap(null);
    selectedShape = null;
    document.getElementById("area").value = "";
  });
}

window.onload = initMap;