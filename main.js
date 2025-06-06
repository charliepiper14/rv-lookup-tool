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
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["rectangle", "polygon"]
    },
    polygonOptions: {
      fillColor: "#ffeb3b",
      strokeColor: "#ffd700",
      editable: true,
      draggable: false
    },
    rectangleOptions: {
      fillColor: "#ffeb3b",
      strokeColor: "#ffd700",
      editable: true,
      draggable: false
    }
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
    if (selectedShape) selectedShape.setMap(null);
    selectedShape = event.overlay;

    let area = 0;

    if (event.type === "polygon") {
      const path = selectedShape.getPath();
      area = google.maps.geometry.spherical.computeArea(path);
    } else if (event.type === "rectangle") {
      const bounds = selectedShape.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const SE = new google.maps.LatLng(sw.lat(), ne.lng());
      const NW = new google.maps.LatLng(ne.lat(), sw.lng());
      const width = google.maps.geometry.spherical.computeDistanceBetween(sw, SE);
      const height = google.maps.geometry.spherical.computeDistanceBetween(sw, NW);
      area = width * height;
    }

    document.getElementById("manual-area").value = Math.round(area);
  });
}

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

    map.panTo(place.geometry.location);
    map.setZoom(19);

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
