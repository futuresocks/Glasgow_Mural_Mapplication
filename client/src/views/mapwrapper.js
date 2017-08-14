var info;
var ImageGetter = require('./imageGetter.js');

var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(
    container, {
      center: center,
      zoom: zoom
    });
  this.googleMap.setOptions({draggable: true, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
  this.markers = [];
};

MapWrapper.prototype.setCenter = function(coords){
  this.googleMap.setCenter(coords);
}

MapWrapper.prototype.addMarker = function(coordsArray, title, tags, id){

  var coords = {lat: coordsArray[0], lng: coordsArray[1]}
  var ig = new ImageGetter();
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    icon: 'markers/' + id + '.png'
  });
  marker.setAnimation(google.maps.Animation.DROP)
  marker.addListener('click', function() {
    if (info) {
      info.close();
    }
    ig.firstPhoto(tags, function(result){
      info = new google.maps.InfoWindow({
        content: '<IMG BORDER="0" ALIGN="Left" SRC=' + result + '></br>' + (title) 
      });
      info.open(this.googleMap, marker);
    });
  })
  this.markers.push(marker);
}

MapWrapper.prototype.showRoute = function(){
  var waypoints = [];
  this.markers.forEach(function(marker){
    waypoints.push(marker.getPosition());
  })

  var route = new google.maps.Polyline({
      map: this.googlemap,
      path: waypoints,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
  });
}

module.exports = MapWrapper;