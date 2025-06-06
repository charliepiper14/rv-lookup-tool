
let formData = {};
let area = 0;

document.getElementById("step1").addEventListener("submit", async function(e) {
  e.preventDefault();
  formData.name = this.name.value;
  formData.company = this.company.value;
  formData.email = this.email.value;
  formData.phone = this.phone.value;
  formData.postcode = this.postcode.value;

  try {
    const res = await fetch('/api/lookup-addresses?postcode=' + encodeURIComponent(formData.postcode));
    const addresses = await res.json();
    const select = document.getElementById("property-select");
    select.innerHTML = "";
    addresses.forEach(addr => {
      const opt = document.createElement("option");
      opt.value = addr.id;
      opt.textContent = addr.address;
      select.appendChild(opt);
    });
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    initMap();
  } catch (err) {
    alert("Failed to retrieve address options. Please check your postcode.");
  }
});

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 51.5045, lng: -0.0865 },
    mapTypeId: "satellite"
  });
  const draw = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: { drawingModes: ["polygon"] },
    polygonOptions: {
      fillColor: "#ffff00",
      fillOpacity: 0.5,
      strokeWeight: 2,
      editable: true,
    }
  });
  draw.setMap(map);
  google.maps.event.addListener(draw, "polygoncomplete", function(polygon) {
    area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    alert("Measured area: " + area.toFixed(2) + " m²");
  });
}

document.getElementById("step2").addEventListener("submit", async function(e) {
  e.preventDefault();
  const selectedID = document.getElementById("property-select").value;
  const manualArea = document.getElementById("manual-area").value;

  const res = await fetch("/api/fetch-valuation?id=" + selectedID);
  const data = await res.json();

  formData.address = data.address;
  formData.description = data.description;
  formData.rv = data.rateable_value;
  formData.area = area || manualArea;
  formData.source = "RV_Lookup";

  document.getElementById("rv-address").textContent = data.address;
  document.getElementById("rv-description").textContent = data.description;
  document.getElementById("rv-value").textContent = data.rateable_value;
  document.getElementById("rv-area").textContent = formData.area;

  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
});

function submitData() {
  fetch("https://hooks.zapier.com/hooks/catch/14702841/20cxqnc/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  }).then(() => alert("Submitted!"));
}
