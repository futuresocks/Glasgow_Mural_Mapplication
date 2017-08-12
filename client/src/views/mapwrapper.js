var ImageGetter = require('./ImageGetter.js');
var info;

var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(
    container, {
      center: center,
      zoom: zoom
    });
  this.googleMap.setOptions({draggable: true, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});

};

MapWrapper.prototype.setCenter = function(coords){
  this.googleMap.setCenter(coords);
}

MapWrapper.prototype.addMarker = function(coordsArray, title, tags){

  var coords = {lat: coordsArray[0], lng: coordsArray[1]}
  var ig = new ImageGetter();

  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  marker.setAnimation(google.maps.Animation.DROP)


  marker.addListener('click', function() {
    if (info) {
        info.close();
    }
    info = new google.maps.InfoWindow({
       content: (title) + '<IMG BORDER="0" ALIGN="Left" SRC=' + ig.firstPhoto(tags) + '>'
     });
    info.open(this.googleMap, marker);
  });

}

module.exports = MapWrapper;