var ImageGetter = function(){
<<<<<<< HEAD

  }    

  ImageGetter.prototype = {
    makeRequest: function(string, callback){
      var request = new XMLHttpRequest();
      request.open('GET', "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=e83c635ab5aca5ad0990f1d779a36309&tags=" + string + "&format=json&nojsoncallback=1");
      request.addEventListener('load', callback);
      request.send();
    },

    allPhotos: function(string){
      this.makeRequest(string, function(){
        if(this.status !== 200)return;
        var jsonString = this.responseText;
        var data = JSON.parse(jsonString);
        console.log(data.photos.photo[0]);
        // callback(murals);
      })
    },

    firstPhoto: function(string){
      this.makeRequest(string, function(){
        if(this.status !== 200)return;
        var jsonString = this.responseText;
        var data = JSON.parse(jsonString);
        var photo = data.photos.photo[0];
        return photo;
      })
    },

=======
  var apiKey = "e83c635ab5aca5ad0990f1d779a36309";

}

ImageGetter.prototype = {
 
  getPhoto: function(string, callback){
    var request = new XMLHttpRequest();
    request.open("GET", "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" + apiKey + "&tags=" + string + "&format=json&nojsoncallback=1");
    request.addEventListener("load", callback);
    request.send();
  }

  firstPhoto: function(category){
    if(this.status !==200) return;
    var jsonString = this.responseText;
    var data = JSON.parse(jsonString);
    console.log(data);
  }    
>>>>>>> Craw

  // photos.photo[0].


  // { "photos": { "page": 1, "pages": 1, "perpage": 100, "total": 6, 
  //     "photo": [
  //       { "id": "34373752302", "owner": "57581651@N05", "secret": "8709cbfcf7", "server": "4170", "farm": 5, "title": "Hip-Hop Marionettes", "ispublic": 1, "isfriend": 0, "isfamily": 0 },

}

module.exports = ImageGetter;