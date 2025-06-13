
let map;
let marker;

document.getElementById("step-1-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
  initMap();
  loadAddresses(document.getElementById("postcode").value);
});

document.getElementById("to-step-3").addEventListener("click", function () {
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");
});

function initMap() {
  if (map) return;
  map = L.map("map").setView([51.505, -0.09], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "\u00a9 OpenStreetMap contributors",
  }).addTo(map);
}

function showLocation(lat, lon) {
  if (!map) initMap();
  if (marker) {
    marker.remove();
  }
  marker = L.marker([lat, lon]).addTo(map);
  map.setView([lat, lon], 16);
}

function loadAddresses(postcode) {
  const dropdown = document.getElementById("address-dropdown");
  dropdown.innerHTML = '<option>Loading addresses...</option>';
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
      postcode
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) {
        dropdown.innerHTML = '<option>No addresses found</option>';
        return;
      }
      dropdown.innerHTML = data
        .map(
          (item) =>
            `<option value="${item.lat},${item.lon}">${item.display_name}</option>`
        )
        .join("");
      const [lat, lon] = [data[0].lat, data[0].lon];
      showLocation(lat, lon);
    })
    .catch(() => {
      dropdown.innerHTML = '<option>Error loading addresses</option>';
    });
}

document
  .getElementById("address-dropdown")
  .addEventListener("change", function () {
    const [lat, lon] = this.value.split(",");
    if (lat && lon) {
      showLocation(lat, lon);
    }
  });
