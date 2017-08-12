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
  },
  update: function(title, boolean){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('murals');
      console.log(title.title);
      collection.updateOne(
          { "title" : title.title },
          {
            $set: { "checked": boolean }
          }
      )
    });
  }
}

module.exports = MuralQuery;


