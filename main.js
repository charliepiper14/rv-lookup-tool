
let area = 0;

document.getElementById('preload-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('preload-form').style.display = 'none';
  document.getElementById('tool').style.display = 'block';
  document.getElementById('result-postcode').textContent = document.getElementById('postcode').value;
  initMap();
});

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 51.5045, lng: -0.0865 },
    mapTypeId: "satellite"
  });

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#ffff00",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    alert("Measured Area: " + area.toFixed(2) + " m²");
  });
}

function submitLead() {
  const manualArea = document.getElementById('manual-area').value;
  const finalArea = manualArea ? parseFloat(manualArea) : area;

  const data = {
    name: document.querySelector('[name="name"]').value,
    company: document.querySelector('[name="company"]').value,
    email: document.querySelector('[name="email"]').value,
    phone: document.querySelector('[name="phone"]').value,
    postcode: document.querySelector('[name="postcode"]').value,
    address: "12 King Street, London, SE1 1AA",
    rv: "£24,000",
    area_sqm: finalArea.toFixed(2),
    source: "RV_Lookup"
  };

  fetch('https://hooks.zapier.com/hooks/catch/14702841/2vw0rcv/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  fetch('https://hooks.highlevel.com/v1/contacts/?endpoint_id=JXfqEoP69fD6cuhotyTI', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert("Submitted to CRM and Zapier.");
}
