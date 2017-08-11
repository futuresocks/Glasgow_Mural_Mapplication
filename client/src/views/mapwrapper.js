var info;

var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(
    container, {
      center: center,
      zoom: zoom
    });
};

MapWrapper.prototype.setCenter = function(coords){
  this.googleMap.setCenter(coords);
}

MapWrapper.prototype.addMarker = function(coordsArray, title){

  var coords = {lat: coordsArray[0], lng: coordsArray[1]}

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
       content: (title)
     });
    info.open(this.googleMap, marker);
  });

}

module.exports = MapWrapper;