
document.getElementById("step-1-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
  loadAddresses(document.getElementById("postcode").value);
});

document.getElementById("to-step-3").addEventListener("click", function () {
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");
});

function loadAddresses(postcode) {
  const dropdown = document.getElementById("address-dropdown");
  dropdown.innerHTML = '<option>10 Downing Street, London</option>';
}
