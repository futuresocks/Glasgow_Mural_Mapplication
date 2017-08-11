var MongoClient = require('mongodb').MongoClient;

var MuralQuery = function(){
  this.url = "mongodb://localhost:27017/murals_list"
};

MuralQuery.prototype = {
  all: function(callback){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('murals');
      collection.find().toArray(function(err, result){
        callback(result);
      });
    });
  }
}

module.exports = MuralQuery;