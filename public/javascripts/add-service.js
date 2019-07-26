function addtext() {
  var nameValue = document.getElementById('sel1').value;
  var serviceValue = document.getElementById('moreinfo').value;
      document.getElementById('service_textarea').textContent += nameValue + '\n' + serviceValue + '\n';
}
