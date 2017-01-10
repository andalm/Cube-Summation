var form = document.getElementById('form');
var results = document.getElementById('results');
var req = new XMLHttpRequest();

req.onreadystatechange = function() {
  if(req.readyState == 4 && req.status == 500) {
    alert(req.responseText);
  }
  if(req.readyState == 4 && req.status == 200) {
    results.innerHTML = JSON.parse(req.response).results.join('<br>');
    form.reset();
  }
};

form.addEventListener('submit', function(event) {
  event.preventDefault();
  req.open(this.getAttribute('method'), this.getAttribute('action'), true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({input: this.elements.input.value}));
});