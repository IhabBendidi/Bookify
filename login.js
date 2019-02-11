var modal = document.getElementById('myModal');
var modaltext = document.getElementById('modaltext');
var span = document.getElementsByClassName("close")[0];
document.getElementById("login").onclick = function login(){

  var request = new XMLHttpRequest();
  const phone = document.getElementById("loginphone").value
  const password = document.getElementById("loginpassword").value
  const message = 'http://localhost:7000/act?role=home&cmd=connexion&phone='+phone+'&password='+password
  console.log(message)
  if ("withCredentials" in request) {
    request.open('GET', message, true);
  } else if (typeof XDomainRequest != "undefined") {
    request = new XDomainRequest();
    request.open('GET', message);
  }
  request.onload = function (response) {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data)
    if (data.code==="ETIMEDOUT"){
      modal.style.display = "block";
      modaltext.textContent = "Inexistant user"
    }else if (data.state===false){
      modal.style.display = "block";
      modaltext.textContent = data.justification
    }else if (data.state){
      window.location.href = 'choices.html';
    }
  }
  request.send();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
