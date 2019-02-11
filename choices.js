var request = new XMLHttpRequest();
var bookDivision = document.getElementById("book-division")

const message = 'http://localhost:7000/act?role=home&cmd=lessenlist'
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
  var y;
  for(y=0;y<data.data.length;y++){
    var bookdiv = document.createElement('div');
    var booktitle = document.createElement('h4');
    var bookauthor = document.createElement('h6');
    const bookcheck = document.createElement('input');
    bookcheck.type = "checkbox";
    bookcheck.name = "book"+y ;
    bookcheck.id = data.data[y].id;
    bookcheck.setAttribute('class', 'checkbook');
    booktitle.innerHTML = data.data[y].title;
    bookauthor.innerHTML = data.data[y].author;
    bookdiv.appendChild(booktitle);
    bookdiv.appendChild(bookauthor);
    bookdiv.appendChild(bookcheck);
    bookDivision.appendChild(bookdiv);
  }
}
request.send();
document.getElementById("giveChoice").onclick = function finalize(){
  var checkbook = document.getElementsByClassName("checkbook");
  var i;
  var checkedboxs = [];
  for(i=0;i<checkbook.length;i++){
    //console.log(checkbook[i].checked)
    if(checkbook[i].checked === true){
      checkedboxs = checkedboxs.concat(checkbook[i].id);
    }
  }

  var userdata = JSON.parse(sessionStorage.user);
  const mess = 'http://localhost:7000/act?role=home&cmd=post&content=choices&readerid='+userdata.data.id+'&ratedBook1='+checkedboxs[0] +'&ratedBook2='+ checkedboxs[1]+'&ratedBook3='+ checkedboxs[2]+'&ratedBook4='+ checkedboxs[3]+'&ratedBook5='+checkedboxs[4] +'&ratedBook6='+ checkedboxs[5]+'&ratedBook7='+checkedboxs[6] +'&ratedBook8='+ checkedboxs[7]+'&ratedBook9='+ checkedboxs[8]+'&ratedBook10='+checkedboxs[9]
  console.log(mess)
  if ("withCredentials" in request) {
    request.open('POST', mess, true);
  } else if (typeof XDomainRequest != "undefined") {
    request = new XDomainRequest();
    request.open('POST', mess);
  }
  request.onload = function (response) {
    // Begin accessing JSON data here
    sessionStorage.user = this.response;
    console.log(sessionStorage.user)
    var data = JSON.parse(this.response);
    console.log(data)
    window.location.href = 'library.html';

  }
  request.send();


}
