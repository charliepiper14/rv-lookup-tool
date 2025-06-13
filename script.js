let map, drawingManager, polygon = null;

function goToStep2() {
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  initMap();
}

function initMap() {
  const input = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(['geometry']);

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 51.5074, lng: -0.1278 },
    mapTypeId: "roadmap",
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#FFFF00",
      strokeColor: "#FFFF00",
      editable: true,
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    if (polygon) polygon.setMap(null);
    polygon = event.overlay;
    const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    document.getElementById("area").value = Math.round(area);
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    map.setCenter(place.geometry.location);
    map.setZoom(19);
  });
}
