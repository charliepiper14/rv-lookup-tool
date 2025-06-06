document.getElementById("step1").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const postcode = form.postcode.value;

  // Hide Step 1, show Step 2
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

  // Fetch addresses from API
  try {
    const res = await fetch(`/api/lookup-addresses?postcode=${postcode}`);
    const addresses = await res.json();

    const dropdown = document.getElementById("addressDropdown");
    dropdown.innerHTML = "";

    if (addresses.length === 0) {
      dropdown.innerHTML = `<option>No results found</option>`;
    } else {
      addresses.forEach(addr => {
        const opt = document.createElement("option");
        opt.value = addr.id;
        opt.textContent = addr.address;
        dropdown.appendChild(opt);
      });
    }
  } catch (err) {
    alert("Failed to retrieve address options. Please check your postcode.");
  }
});
