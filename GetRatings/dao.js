
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://hack-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';

module.exports.getRatings =async function(){
  
  option = { 
    auth: {
      user: 'hack-db',
      password: 'q5mwGPHkQwKvxTz0zgGtSsttoReNOUF9IBSxV13ov78956TynH5VFTB93JMf9dfTPk3WpfyOWo4u1HF3oNEVFQ=='
    }
  };

ratingArray = [];

gooz =await new Promise((resolve, reject) => {
   returned =  mongoClient.connect(url,option , async function(err, client){
    var db = client.db('hack-db-id');
    result = await db.collection('ratings').find().forEach( function(myDoc) {
     console.log(myDoc);
       ratingArray.push(myDoc);
     } );
     resolve();
     return ratingArray;
  });
});
      return     JSON.stringify(ratingArray) ;
    
}
