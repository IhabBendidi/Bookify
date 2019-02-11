var seneca = require('seneca')()

seneca.use('mongo-store', {
  name: 'bookify',
  host: 'localhost',
  port: 27017,
  options: {}
}).use("entity",{mem_store: false})


seneca.ready(function () {
  //Liste les livres ayant le meilleur rating
  seneca.add("role:book,cmd:getlist",function(msg,respond){
    var books = seneca.make('books')
    books.list$({"stars":"5"},function(err,books){
      respond(null,{"data":books})
    })
  })

  seneca.add("role:book,cmd:lessenlist",function(msg,respond){
    seneca.act({"role":"book","cmd":"getlist"},function(err,response){
      var i;
      var books =[];
      for(i=0;i<30;i++){
        books = books.concat(response.data[i])
      }
      respond(null,{"data":books})
    })
  })



  seneca.add("role:book,cmd:getbook",function(msg,respond){
    var books = seneca.make('books')
    books.load$(msg.bookid,function(err,books){
      respond(null,{"data":books})
    })
  })







}).use('mesh',{"pin":"role:book"})
