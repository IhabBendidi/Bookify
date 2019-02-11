
document.getElementById("signup").onclick = function signup(){
  var request = new XMLHttpRequest();
  const name = document.getElementById("signupname").value
  const prenom = document.getElementById("signupprenom").value
  const phone = document.getElementById("signupphone").value
  const email = document.getElementById("signupemail").value
  const username = document.getElementById("signupusername").value
  const birthDate = document.getElementById("signupbirth").value
  const city = document.getElementById("signupcity").value
  const country = document.getElementById("signupcountry").value
  const password = document.getElementById("signuppassword").value
  const nationality = document.getElementById("signupnationality").value
  const message = 'http://localhost:7000/act?role=home&cmd=inscription&nom='+ name + '&prenom='+prenom+'&phone='+phone+'&email='+email+'&password='+password+'&username='+username+'&birthdate='+birthDate+'&city='+city+'&country='+country+'&nationality='+nationality
  console.log(message)
  if ("withCredentials" in request) {
    request.open('POST', message, true);
  } else if (typeof XDomainRequest != "undefined") {
    request = new XDomainRequest();
    request.open('POST', message);
  }
  request.onload = function (response) {

    // Begin accessing JSON data here
    sessionStorage.user = this.response;
    console.log(sessionStorage.user)
    var data = JSON.parse(this.response);
    console.log(data)
    window.location.href = 'choices.html';
  }
  request.send();
};
