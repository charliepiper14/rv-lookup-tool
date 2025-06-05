
document.getElementById('preload-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('preload-form').style.display = 'none';
  document.getElementById('results').style.display = 'block';
});

function submitLead() {
  const data = {
    name: document.querySelector('[name="name"]').value,
    company: document.querySelector('[name="company"]').value,
    email: document.querySelector('[name="email"]').value,
    phone: document.querySelector('[name="phone"]').value,
    postcode: document.querySelector('[name="postcode"]').value,
    rv: "£24,000",
    address: "12 King Street, London, SE1 1AA",
    source: "RV_Lookup"
  };

  fetch('https://hooks.zapier.com/hooks/catch/14702841/2vw0rcv/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  fetch('https://hooks.highlevel.com/v1/contacts/?endpoint_id=JXfqEoP69fD6cuhotyTI', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert("Submitted to CRM and Zapier.");
}
