var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://hack-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';


module.exports.insertItem = function(item, collectionName){

    mongoClient.connect(url, { 
        auth: {
          user: 'hack-db',
          password: 'q5mwGPHkQwKvxTz0zgGtSsttoReNOUF9IBSxV13ov78956TynH5VFTB93JMf9dfTPk3WpfyOWo4u1HF3oNEVFQ=='
        }
      }, function(err, client) {
        assert.equal(null, err);
      
        var db = client.db('hack-db-id');
        db.collection(collectionName).insertOne(item);      
                    client.close();
      });
}

module.exports.getItem =async function(key){
  option = { 
    auth: {
      user: 'hack-db',
      password: 'q5mwGPHkQwKvxTz0zgGtSsttoReNOUF9IBSxV13ov78956TynH5VFTB93JMf9dfTPk3WpfyOWo4u1HF3oNEVFQ=='
    }
  };
var ratingArray ;
gooz =await new Promise((resolve, reject) => {
   returned =  mongoClient.connect(url,option , async function(err, client){
    var db = client.db('hack-db-id');
    result = await db.collection('items').find({_id:key}).forEach( function(myDoc) {
     console.log(myDoc);
     ratingArray = myDoc;
     } );
     resolve();
     return ratingArray;
  });
});
      return     JSON.stringify(ratingArray) ;
    
}

module.exports.deleteItems =async function(ids){
    option = { 
      auth: {
        user: 'hack-db',
        password: 'q5mwGPHkQwKvxTz0zgGtSsttoReNOUF9IBSxV13ov78956TynH5VFTB93JMf9dfTPk3WpfyOWo4u1HF3oNEVFQ=='
      }
    };
  var ratingArray ;
  gooz =await new Promise((resolve, reject) => {
     returned =  mongoClient.connect(url,option , async function(err, client){
      var db = client.db('hack-db-id');
      result = await db.collection('items').deleteMany({ "_id": {$in:ids} },
      function(err, results) {
      });
       resolve();
    });
  });      
  }