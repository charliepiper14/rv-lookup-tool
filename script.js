
let map, drawingManager, selectedShape;

function goToStep2() {
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');
    initMap();
}

function initMap() {
    const mapCenter = { lat: 51.509865, lng: -0.118092 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: mapCenter,
    });

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
        }
    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
        },
        polygonOptions: {
            editable: true,
            fillColor: '#FFD700'
        }
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (e) => {
        if (selectedShape) selectedShape.setMap(null);
        selectedShape = e.overlay;
    });
}

function goToStep3() {
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.remove('hidden');

    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const postcode = document.getElementById('postcode').value;
    const area = document.getElementById('manual-area').value || 'drawn shape';

    document.getElementById('results').innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Postcode:</strong> ${postcode}</p>
        <p><strong>Estimated Area:</strong> ${area} m²</p>
        <p><strong>Rateable Value:</strong> £24,000</p>
        <p><strong>Similar Nearby:</strong> £21,500 | £19,800</p>
    `;
}

function submitToCRM() {
    alert("Submitted to CRM and Zapier!");
}
