document.getElementById('form-step1').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('step1').classList.remove('active');
  document.getElementById('step2').classList.add('active');
  initMap();
});

document.getElementById('back-to-step1').addEventListener('click', function() {
  document.getElementById('step2').classList.remove('active');
  document.getElementById('step1').classList.add('active');
});

let map, drawingManager, selectedShape;

function initMap() {
  const defaultLocation = { lat: 51.5074, lng: -0.1278 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: defaultLocation,
  });

  const input = document.getElementById('address-input');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(19);
    }
  });

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon'],
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
    if (selectedShape) {
      selectedShape.setMap(null);
    }
    selectedShape = e.overlay;
    const area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
    document.getElementById('area-input').value = Math.round(area);
  });
}