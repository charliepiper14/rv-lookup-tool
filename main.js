
document.getElementById("step1Form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const postcode = formData.get("postcode");

  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

  try {
    const response = await fetch(`https://<your-render-subdomain>.onrender.com/lookup-addresses?postcode=${postcode}`);
    const results = await response.json();
    const dropdown = document.getElementById("addressDropdown");
    dropdown.innerHTML = "";
    results.forEach(r => {
      const option = document.createElement("option");
      option.value = r.id;
      option.textContent = r.address;
      dropdown.appendChild(option);
    });
  } catch (err) {
    alert("Failed to retrieve address options. Please check your postcode.");
  }
});
