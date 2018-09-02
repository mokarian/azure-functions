
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://hack-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';

module.exports.insertDocument = function(rating){

    mongoClient.connect(url, { 
        auth: {
          user: 'hack-db',
          password: 'q5mwGPHkQwKvxTz0zgGtSsttoReNOUF9IBSxV13ov78956TynH5VFTB93JMf9dfTPk3WpfyOWo4u1HF3oNEVFQ=='
        }
      }, function(err, client) {
        assert.equal(null, err);
      
        var db = client.db('hack-db-id');
        db.collection('ratings').insertOne(rating);
                    
                    client.close();
      
      });
}
