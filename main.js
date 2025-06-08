function goToStep2() {
  document.getElementById('step-1').classList.remove('active');
  document.getElementById('step-2').classList.add('active');
}
function goToStep3() {
  document.getElementById('step-2').classList.remove('active');
  document.getElementById('step-3').classList.add('active');
}
function submitToCRM() {
  alert("Data submitted to CRM!");
}
