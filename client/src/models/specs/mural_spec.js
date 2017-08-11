var Mural = require('../murals.js')
var assert = require('assert');
var url = "mongodb://localhost:27017/murals_list";
var MongoClient = require('mongodb').MongoClient;

describe('Murals', function() {
  var mural;

  beforeEach(function() {
    mural = new Mural({
      MongoClient.connect(url, function(err, db){
            var collection = db.collection('murals');
            collection.find().toArray(function(err, result){
              callback(result);
            });
          });
});

  it('should have id 02', function() {
      assert.equal(mural.id, 2);
    });

  it('should have latitude 55.860772', function(){
      assert.equal(mural.coords[0], 55.860772);
  });

  it('should have img tag strathwonderwall', function(){
    assert.equal(mural.imageTags, "strathwonderwall");
  });


  });

});