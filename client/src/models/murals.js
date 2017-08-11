

var Murals = function(){

}

Murals.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
  },
  all: function(callback){
    this.makeRequest("http://localhost:3000/api", function(){
      if(this.status !== 200)return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      var murals = results;
      callback(murals);
    })
  }
}

module.exports = Murals;
