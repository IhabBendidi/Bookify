//var request = new XMLHttpRequest();
var likedbooks = document.getElementById("liked-books");
var pickedbooks = document.getElementById("picked-books");
var rotationbooks = document.getElementById("rotation-books");
var userdata = JSON.parse(sessionStorage.user);
var i;

for(i=0;i<userdata.data.ratedBooks.length;i++){
  const bookdiv = document.createElement('div');
  const booktitle = document.createElement('h4');
  const bookauthor = document.createElement('h6');
  const booklink = document.createElement('a');
  const request = new XMLHttpRequest();
  const message = 'http://localhost:7000/act?role=home&cmd=getbook&bookid='+userdata.data.ratedBooks[i].id
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
    booktitle.innerHTML = data.data.title;
    bookauthor.innerHTML = data.data.author;
    booklink.innerHTML = "Read More";
    booklink.href = data.data.url;
    bookdiv.appendChild(booktitle);
    bookdiv.appendChild(bookauthor);
    bookdiv.appendChild(booklink);
    likedbooks.appendChild(bookdiv);
  }
  request.send();
}






const request = new XMLHttpRequest();
const message = 'http://localhost:7000/act?role=home&cmd=get&content=recommendation&readerid='+userdata.data.id
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
  for(i=0;i<data.data.length;i++){
    const bookdiv = document.createElement('div');
    const booktitle = document.createElement('h4');
    const bookauthor = document.createElement('h6');
    const booklink = document.createElement('a');
    const requests = new XMLHttpRequest();
    const mess = 'http://localhost:7000/act?role=home&cmd=getbook&bookid='+data.data[i].id
    if ("withCredentials" in requests) {
      requests.open('GET', mess, true);
    } else if (typeof XDomainRequest != "undefined") {
      requests = new XDomainRequest();
      requests.open('GET', mess);
    }
    requests.onload = function (response) {
      // Begin accessing JSON data here
      var newdata = JSON.parse(this.response);
      console.log(newdata)
      booktitle.innerHTML = newdata.data.title;
      bookauthor.innerHTML = newdata.data.author;
      booklink.innerHTML = "Read More";
      booklink.href = newdata.data.url;
      bookdiv.appendChild(booktitle);
      bookdiv.appendChild(bookauthor);
      bookdiv.appendChild(booklink);
      pickedbooks.appendChild(bookdiv);
    }
    requests.send();
  }
}
request.send();


const therequest = new XMLHttpRequest();
const themessage = 'http://localhost:7000/act?role=home&cmd=get&content=rotation&readerid='+userdata.data.id
if ("withCredentials" in therequest) {
  therequest.open('GET', themessage, true);
} else if (typeof XDomainRequest != "undefined") {
  therequest = new XDomainRequest();
  therequest.open('GET', themessage);
}
therequest.onload = function (response) {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(data)
  for(i=0;i<data.data.length;i++){
    const bookdiv = document.createElement('div');
    const booktitle = document.createElement('h4');
    const bookauthor = document.createElement('h6');
    const booklink = document.createElement('a');
    const requests = new XMLHttpRequest();
    const mess = 'http://localhost:7000/act?role=home&cmd=getbook&bookid='+data.data[i].id
    if ("withCredentials" in requests) {
      requests.open('GET', mess, true);
    } else if (typeof XDomainRequest != "undefined") {
      requests = new XDomainRequest();
      requests.open('GET', mess);
    }
    requests.onload = function (response) {
      // Begin accessing JSON data here
      var newdata = JSON.parse(this.response);
      console.log(newdata)
      booktitle.innerHTML = newdata.data.title;
      bookauthor.innerHTML = newdata.data.author;
      booklink.innerHTML = "Read More";
      booklink.href = newdata.data.url;
      bookdiv.appendChild(booktitle);
      bookdiv.appendChild(bookauthor);
      bookdiv.appendChild(booklink);
      rotationbooks.appendChild(bookdiv);
    }
    requests.send();
  }
}
therequest.send();
