var seneca = require('seneca')()
seneca.use('mongo-store', {
  name: 'bookify',
  host: 'localhost',
  port: 27017,
  options: {}
}).use("entity",{mem_store: false})



seneca.ready(function () {


  const ContentBasedRecommender = require('content-based-recommender')
  const recommender = new ContentBasedRecommender({
    minScore: 0.05,
    maxSimilarDocuments: 100
  });

  seneca.act({"role":"home","cmd":"getlist"},function(err,response){
    var documents = []
    var i;
    for (i=0;i<2482;i++){
      var content = response.data[i].part1 + response.data[i].part2 +response.data[i].part3 +response.data[i].part4 +response.data[i].part5 +response.data[i].part6 +response.data[i].part7 +response.data[i].part8 +response.data[i].part9 + response.data[i].part10 +response.data[i].part11 +response.data[i].part12 +response.data[i].part13 +response.data[i].part14 +response.data[i].part15  +response.data[i].part16 +response.data[i].part17 +response.data[i].part18 +response.data[i].part19 +response.data[i].part20
      var tab = [{"id":response.data[i].id,"content":content}]
      documents = documents.concat(tab)

    }
    // start training
    recommender.train(documents);
    console.log("End of training")
  })




  seneca.add("role:content,cmd:get,content:recommendation",function(msg,respond){
    var number = Math.floor(Math.random() * 10);

    console.log(msg.readerdata.ratedBooks[number].id)
    const similarDocuments = recommender.getSimilarDocuments(msg.readerdata.ratedBooks[number].id, 0, 15);
    console.log(similarDocuments)
    //const similarDocuments = "blabla"
    respond(null,{"data":similarDocuments})


  })

  seneca.add("role:content,cmd:get,content:rotation",function(msg,respond){
    var number1 = Math.floor(Math.random() * 10);
    var number2 = Math.floor(Math.random() * 10);
    var number3 = Math.floor(Math.random() * 10);

    var similarDocuments1 = recommender.getSimilarDocuments(msg.readerdata.ratedBooks[number1].id, 0, 4);
    console.log(similarDocuments1)
    var similarDocuments2 = recommender.getSimilarDocuments(msg.readerdata.ratedBooks[number2].id, 0, 4);
    console.log(similarDocuments2)
    var similarDocuments3 = recommender.getSimilarDocuments(msg.readerdata.ratedBooks[number3].id, 0, 4);
    console.log(similarDocuments3)
    similarDocuments1 = similarDocuments1.concat(similarDocuments2);
    console.log(similarDocuments1)
    similarDocuments1 = similarDocuments1.concat(similarDocuments3);
    console.log(similarDocuments1)
    //const similarDocuments = "blabla"
    respond(null,{"data":similarDocuments1})


  })







}).use('mesh',{"pin":"role:content"})
