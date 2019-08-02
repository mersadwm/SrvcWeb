function addtext() {
  var nameValue = document.getElementById('sel1').value;
  var serviceValue = document.getElementById('moreinfo').value;
  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  document.getElementById('service_textarea').textContent += nameValue + '\n' + serviceValue + '\n';
  cell1.innerHTML = '__';
  cell2.innerHTML = nameValue;
  cell3.innerHTML = serviceValue;
}