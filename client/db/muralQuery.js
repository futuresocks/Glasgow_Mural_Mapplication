var MongoClient = require('mongodb').MongoClient;

var MuralQuery = function(){
  this.url = "mongodb://localhost:27017/murals_list"
};

MuralQuery.prototype = {
  
}

module.exports = MuralQuery;