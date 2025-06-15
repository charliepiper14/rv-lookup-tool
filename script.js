
document.getElementById("to-step-2").onclick = () => {
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
};

document.getElementById("to-step-3").onclick = () => {
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");

  // Simulate a fetch to VOA data
  const results = document.getElementById("results");
  results.innerHTML = "<p>Estimated RV: £24,500</p><p>Comparable 1: £22,000</p><p>Comparable 2: £21,800</p><p>Potential savings: £2,500+</p>";
};
