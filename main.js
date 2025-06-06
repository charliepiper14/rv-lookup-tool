
document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  let currentStep = 0;

  function showStep(n) {
    steps.forEach((s, i) => s.classList.toggle('active', i === n));
    document.getElementById('step-number').textContent = n + 1;
  }

  showStep(0);

  document.getElementById('step1-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate lookup
    document.getElementById('address-dropdown').innerHTML = '<option value="123">10 Downing Street, London</option>';
    showStep(1);
  });

  document.getElementById('to-step-3').addEventListener('click', () => {
    document.getElementById('results-box').textContent = '£24,000 (example result)';
    showStep(2);
  });

  document.getElementById('submit-review').addEventListener('click', () => {
    alert('Submitted to Zapier + GoHighLevel (simulation)');
  });
});
