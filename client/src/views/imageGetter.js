var ImageGetter = function(){

  }    

  ImageGetter.prototype = {
    makeRequest: function(string, callback){
      var request = new XMLHttpRequest();
      request.open('GET', "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=e83c635ab5aca5ad0990f1d779a36309&text=" + string + "&format=json&nojsoncallback=1");
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

    firstPhoto: function(string, callback){
      this.makeRequest(string, function(){
        if(this.status !== 200)return;
        var jsonString = this.responseText;
        var data = JSON.parse(jsonString);
        var photo = data.photos.photo[0];
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_t.jpg";
        callback(url);
      })
    },

  // photos.photo[0].


  // { "photos": { "page": 1, "pages": 1, "perpage": 100, "total": 6, 
  //     "photo": [
  //       { "id": "34373752302", "owner": "57581651@N05", "secret": "8709cbfcf7", "server": "4170", "farm": 5, "title": "Hip-Hop Marionettes", "ispublic": 1, "isfriend": 0, "isfamily": 0 },

}

module.exports = ImageGetter;