
let currentStep = 0;
const steps = document.querySelectorAll('.step');
const stepNumber = document.getElementById('step-number');

function showStep(n) {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === n);
  });
  stepNumber.textContent = n + 1;
}

document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);

  document.getElementById('step1-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showStep(1);
    initAutocomplete();
  });

  document.getElementById('to-step-3').addEventListener('click', () => {
    document.getElementById('results-box').textContent = '£24,000 (example result)';
    showStep(2);
  });

  document.getElementById('submit-review').addEventListener('click', () => {
    alert('Submitted to Zapier + GoHighLevel (simulation)');
  });
});

function initAutocomplete() {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'autocomplete';
  input.placeholder = 'Start typing address...';
  input.style = 'margin-bottom: 1rem; padding: 0.8rem; width: 100%; font-size: 1rem;';

  const dropdownContainer = document.getElementById('address-dropdown');
  dropdownContainer.innerHTML = '';
  dropdownContainer.appendChild(input);

  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['address'],
    componentRestrictions: { country: 'gb' }
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      input.dataset.selectedAddress = place.formatted_address;
      console.log('Selected Address:', place.formatted_address);
    }
  });
}
