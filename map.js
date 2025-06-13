
let map;
let drawingManager;
let selectedShape;
let areaInput = document.getElementById('area');
let addressInput = document.getElementById('address');

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 51.5074, lng: -0.1278 },
    mapTypeId: "satellite",
  });

  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    types: ["address"],
    componentRestrictions: { country: "uk" },
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(20);
    }
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#ffff00",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: false,
      editable: false,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
    if (selectedShape) {
      selectedShape.setMap(null);
    }

    selectedShape = event.overlay;

    const areaSqMeters = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
    areaInput.value = Math.round(areaSqMeters);
  });
}
