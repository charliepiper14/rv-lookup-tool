
let currentStep = 0;
const steps = document.querySelectorAll('.step');
const stepNumber = document.getElementById('step-number');

function showStep(n) {
  steps.forEach((step, index) => step.classList.toggle('active', index === n));
  stepNumber.textContent = n + 1;
}

document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);

  document.getElementById('step1-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showStep(1);
    initAutocomplete();
    initMap();
  });

  document.getElementById('to-step-3').addEventListener('click', () => {
    document.getElementById('results-box').textContent = '£24,000 (example result)';
    showStep(2);
  });

  document.getElementById('submit-review').addEventListener('click', () => {
    alert('Submitted to Zapier + GoHighLevel (simulation)');
  });
});

function initAutocomplete() {
  const input = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['address'],
    componentRestrictions: { country: 'gb' }
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      input.dataset.selectedAddress = place.formatted_address;
      console.log('Selected Address:', place.formatted_address);
    }
  });
}

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.509865, lng: -0.118092 }, // Central London
    zoom: 13,
  });

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon', 'rectangle'],
    },
    polygonOptions: {
      fillColor: '#ffff00',
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: false,
      editable: true,
      zIndex: 1
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    let area = 0;
    if (event.type === 'polygon') {
      area = google.maps.geometry.spherical.computeArea(event.overlay.getPath());
    } else if (event.type === 'rectangle') {
      const bounds = event.overlay.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const width = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(ne.lat(), sw.lng()),
        new google.maps.LatLng(ne.lat(), ne.lng())
      );
      const height = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(ne.lat(), ne.lng()),
        new google.maps.LatLng(sw.lat(), ne.lng())
      );
      area = width * height;
    }
    const sqm = Math.round(area);
    document.getElementById('manual-area').value = sqm;
  });
}
