
curl -d '{"role":"home","cmd":"connexion","phone": "555","password": "#test123"}' http://localhost:7000/act
'http://localhost:7000/act?role=home&cmd=connexion&phone='+phone+'&password='+password
http://localhost:7000/act?role=home&cmd=connexion&phone=0636225814&password=123456789


curl -d '{"role":"home","cmd":"inscription","prenom":"Ihab","nom":"bendidi","phone": "555","email":"bendidiihab@gmail.com","password": "#test123","username":"ivan","birthDate":"23/02/1997","city":"Rabat","country":"Morocco","nationality":"Moroccan"}' http://localhost:7000/act
http://localhost:7000/act?role=home&cmd=inscription&nom=chaimaa&prenom=bendidi&phone=0636225814&email=ihabnobendidi@gmail.com&password=123456789&username=ivan&birthDate=23&city=agadir&country=morocco&nationality=Moroccan


curl -d '{"role":"home","cmd":"getlist"}' http://localhost:7000/act
http://localhost:7000/act?role=home&cmd=getlist

http://localhost:7000/act?role=home&cmd=post&content=choices&readerid=5c18656112c630352cf1a176&ratedBook1=5c1878e56887a21a1034ea1f&rating1=3&ratedBook2=5c1878e56887a21a1034ea1f&rating2=3&ratedBook3=5c1878e56887a21a1034ea1f&rating3=3&ratedBook4=5c1878e56887a21a1034ea1f&rating4=3&ratedBook5=5c1878e56887a21a1034ea1f&rating5=3&ratedBook6=5c1878e56887a21a1034ea1f&rating6=3&ratedBook7=5c1878e56887a21a1034ea1f&rating7=3&ratedBook8=5c1878e56887a21a1034ea1f&rating8=3&ratedBook9=5c1878e56887a21a1034ea1f&rating9=3&ratedBook10=5c1878e56887a21a1034ea1f&rating10=3


http://localhost:7000/act?role=home&cmd=getbook&bookid=5c212e812596522b54791134

http://localhost:7000/act?role=home&cmd=get&content=recommendation&readerid=5c18656112c630352cf1a176
