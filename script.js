document.addEventListener("DOMContentLoaded", () => {
  const toStep2 = document.getElementById("to-step-2");
  const toStep3 = document.getElementById("to-step-3");
  const submitBtn = document.getElementById("submit");

  toStep2.onclick = () => {
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
    initAutocomplete();
  };

  toStep3.onclick = () => {
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-3").classList.remove("hidden");
    document.getElementById("results").innerText = "RV: £12,500\nNearby: £10,800 & £13,100";
  };

  submitBtn.onclick = () => {
    fetch("https://hooks.zapier.com/hooks/catch/14702841/20cxqnc/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: document.getElementById("name").value,
        company: document.getElementById("company").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        postcode: document.getElementById("postcode").value,
        address: document.getElementById("address-dropdown").value,
        area: document.getElementById("manual-area").value,
        businessClass: document.getElementById("business-class").value
      })
    });
    alert("Submitted");
  };
});

let currentOverlay;

function initAutocomplete() {
  const dropdown = document.getElementById("address-dropdown");
  const postcode = document.getElementById("postcode").value;
  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions({ input: postcode, componentRestrictions: { country: "uk" } }, (predictions, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
      dropdown.innerHTML = "";
      predictions.forEach(pred => {
        const opt = document.createElement("option");
        opt.value = pred.description;
        opt.textContent = pred.description;
        dropdown.appendChild(opt);
      });
    }
  });

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: { lat: 51.5074, lng: -0.1278 },
  });

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"],
    },
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
    if (currentOverlay) {
      currentOverlay.setMap(null);
    }
    currentOverlay = event.overlay;
    if (event.type === "polygon") {
      const area = google.maps.geometry.spherical.computeArea(event.overlay.getPath());
      document.getElementById("manual-area").value = (area).toFixed(2);
    }
  });

  const geocoder = new google.maps.Geocoder();
  dropdown.onchange = () => {
    geocoder.geocode({ address: dropdown.value }, (results, status) => {
      if (status === "OK") {
        map.setCenter(results[0].geometry.location);
      }
    });
  };
}
