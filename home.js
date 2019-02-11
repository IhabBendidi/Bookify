const Routes = [{
  pin: 'role:home,cmd:*',
  prefix: '/home',
  map: {
   inscription: {
     GET: true,
     POST: true,
   },
   connexion: {
     GET: true,
     POST: true,
   },getlist: {
     GET: true,
     POST: true,
   },post: {
     GET: true,
     POST: true,
   },getcontent: {
     GET: true,
     POST: true,
   },get: {
     GET: true,
     POST: true,
   },lessenlist: {
     GET: true,
     POST: true,
   },getbook: {
     GET: true,
     POST: true,
   }
}}]

var seneca = require('seneca')()
const express = require('express')()
express.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var config = {
  routes: Routes,
  adapter: require('seneca-web-adapter-express'),
  context: express,
  options: {parseBody: true}
}
const web = require('seneca-web')
/**
const cors = require('cors')
express.use(cors())
**/



seneca.use('mongo-store', {
  name: 'bookify',
  host: 'localhost',
  port: 27017,
  options: {}
}).use("entity",{mem_store: false}).use(web, config)








seneca.ready(function () {


  //Inscrit l'utilisateur dans la base de données
  seneca.add("role:home,cmd:inscription",function(msg,respond){
    seneca.act({"role":"auth","cmd":"inscription","nom":msg.nom,"prenom":msg.prenom,"phone":msg.phone,"email":msg.email,"password":msg.password,"username":msg.username,"birthDate":msg.birthDate,"city":msg.city,"country":msg.country,"nationality":msg.nationality},function(err,response){
      respond(null,response)
    })
  })



  //Connexion de l'utilisateur dans la base de données
  seneca.add("role:home,cmd:connexion",function(msg,respond){
    seneca.act({"role":"auth","cmd":"connexion","phone":msg.phone,"password":msg.password},function(err,response){
      respond(null,response)
    })
  })


  seneca.add("role:home,cmd:getlist",function(msg,respond){
    seneca.act({"role":"book","cmd":"getlist"},function(err,response){
      respond(null,response)
    })
  })

  seneca.add("role:home,cmd:getbook",function(msg,respond){
    seneca.act({"role":"book","cmd":"getbook","bookid":msg.bookid},function(err,response){
      respond(null,response)
    })
  })

  seneca.add("role:home,cmd:lessenlist",function(msg,respond){
    seneca.act({"role":"book","cmd":"lessenlist"},function(err,response){
      respond(null,response)
    })
  })


  seneca.add("role:home,cmd:post,content:choices",function(msg,respond){
    var readers = seneca.make('readers')
    readers.ratedBooks = [{"id":msg.ratedBook1},{"id":msg.ratedBook2},{"id":msg.ratedBook3},{"id":msg.ratedBook4},{"id":msg.ratedBook5},{"id":msg.ratedBook6},{"id":msg.ratedBook7},{"id":msg.ratedBook8},{"id":msg.ratedBook9},{"id":msg.ratedBook10}]
    readers.save$({"id":msg.readerid},function(err,readers){
      respond(null,{"data":readers})
    })
  })

  /*seneca.add("role:home,cmd:get,content:reader",function(msg,respond){
    var readers = seneca.make('readers')
    readers.load$(msg.readerid,function(err,readers){
      respond(null,{"data":readers})
    })
  })*/


  seneca.add("role:home,cmd:get,content:recommendation",function(msg,respond){
    var readers = seneca.make('readers')
    readers.load$(msg.readerid,function(err,readerss){
      seneca.act({"role":"content","cmd":"get",'content':"recommendation","readerdata":readerss},function(err,response){
        respond(null,response)
      })
    })
  })


  seneca.add("role:home,cmd:get,content:rotation",function(msg,respond){
    var readers = seneca.make('readers')
    readers.load$(msg.readerid,function(err,readerss){
      seneca.act({"role":"content","cmd":"get",'content':"rotation","readerdata":readerss},function(err,response){
        respond(null,response)
      })
    })
  })




}).use('mesh',{"pin":"role:home"}).listen({port:7000,host:'localhost',"pin":"role:home"})
