var seneca = require('seneca')()
seneca.use('mongo-store', {
  name: 'bookify',
  host: 'localhost',
  port: 27017,
  options: {}
}).use("entity",{mem_store: false})

seneca.ready(function () {

  //Inscrit l'utilisateur dans la base de données
  seneca.add("role:auth,cmd:inscription",function(msg,respond){
    var readers = seneca.make('readers')
    readers.nom = msg.nom
    readers.prenom = msg.prenom
    readers.phone = msg.phone
    readers.email = msg.email
    readers.password = msg.password
    readers.username = msg.username
    readers.birthDate = msg.birthDate
    readers.city = msg.city
    readers.country = msg.country
    readers.nationality = msg.nationality

    readers.save$(function(err,readers){
      if(err) console.log(err)
      respond(null,{"inscription":"success","data":readers})
    })
  })





  //Connexion de l'utilisateur dans la base de données
  seneca.add("role:auth,cmd:connexion",function(msg,respond){
    var readers = seneca.make('readers')
    readers.load$({"phone":msg.phone}, function(err,readers){
      if (err) respond(null,{"state":false,"justification":"inexistant user"})
      if(readers.password===msg.password){
        respond(null,{"state":true, "data":readers})
      }else{
        respond(null,{"state":false,"justification":"Wrong Password"})
      }
    })
  })







}).use('mesh',{"pin":"role:auth"})
