
document.getElementById('form-step-1').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('step-1').classList.remove('active');
  document.getElementById('step-2').classList.add('active');
});

document.getElementById('to-step-3').addEventListener('click', function() {
  document.getElementById('step-2').classList.remove('active');
  document.getElementById('step-3').classList.add('active');
  document.getElementById('results').innerText = 'Rateable value results loading...';
});
