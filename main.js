let map;
let drawingManager;
let selectedShape;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: -0.1278 },
    zoom: 8,
    mapTypeId: "roadmap"
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["polygon", "rectangle"]
    },
    polygonOptions: {
      editable: true,
      fillColor: "#ffeb3b",
      strokeWeight: 2
    },
    rectangleOptions: {
      editable: true,
      fillColor: "#ffeb3b",
      strokeWeight: 2
    }
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
    if (selectedShape) {
      selectedShape.setMap(null);
    }
    selectedShape = event.overlay;

    const area = google.maps.geometry.spherical.computeArea(selectedShape.getPath ? selectedShape.getPath() : selectedShape.getBounds().toPolygonPath());
    document.getElementById("manual-area").value = Math.round(area);
  });
}

google.maps.LatLngBounds.prototype.toPolygonPath = function () {
  const ne = this.getNorthEast();
  const sw = this.getSouthWest();
  return [
    new google.maps.LatLng(ne.lat(), sw.lng()),
    new google.maps.LatLng(ne.lat(), ne.lng()),
    new google.maps.LatLng(sw.lat(), ne.lng()),
    new google.maps.LatLng(sw.lat(), sw.lng())
  ];
};

function initAutocomplete() {
  const input = document.getElementById("autocomplete");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(["geometry", "name"]);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert("No details available for that input.");
      return;
    }

    // Zoom and pan the map to the selected place
    map.panTo(place.geometry.location);
    map.setZoom(19);

    // Place marker
    if (window.propertyMarker) window.propertyMarker.setMap(null);
    window.propertyMarker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("step1-form").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("step-1").classList.remove("active");
    document.getElementById("step-2").classList.add("active");
    document.getElementById("step-number").textContent = "2";
    initMap();
    initAutocomplete();
  });

  document.getElementById("to-step-3").addEventListener("click", function () {
    document.getElementById("step-2").classList.remove("active");
    document.getElementById("step-3").classList.add("active");
    document.getElementById("step-number").textContent = "3";
    document.getElementById("results-box").innerText = "Estimated RV based on postcode and area...";
  });

  document.getElementById("submit-review").addEventListener("click", function () {
    alert("Data submitted to webhook.");
  });
});
