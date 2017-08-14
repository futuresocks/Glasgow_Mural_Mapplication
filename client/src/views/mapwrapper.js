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

MapWrapper.prototype.addMarker = function(coordsArray, mural, tags, id){

  var coords = {lat: coordsArray[0], lng: coordsArray[1]}
  var ig = new ImageGetter();
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    icon: 'markers/' + id + '.png'
  });
  marker.setAnimation(google.maps.Animation.DROP)
  marker.addListener('click', function() {
    marker.setAnimation(null)
    if (info) {
      info.close();
    }
    var seen = "Not Spotted!"
    if (mural.checked){
      seen = "Spotted!"
    }
    ig.firstPhoto(tags, function(result){
      info = new google.maps.InfoWindow({
        content: '<div class="info-window"><IMG BORDER="0" ALIGN="Left" style="width: 200px" SRC=' + result + '></hl><h3>' + (mural.id + ': ' + mural.title) + '</h3><h5> Artist: '+ mural.artist +'</h5><h5>Status: ' + seen + '</h5><button type="button" onclick="var button = document.getElementById(\'myBtn\'); button.setAttribute(\'title\',\'' + mural.title +'\'); button.setAttribute(\'artist\',\'' + mural.artist +'\'); button.setAttribute(\'about\',\'' + mural.about +'\'); button.setAttribute(\'nearby\',\'' + mural.nearby +'\'); button.setAttribute(\'image\',\'' + result +'\'); button.click();">More Info</button></div>'
      });
      info.open(this.googleMap, marker);
    });
  })
  this.markers.push(marker);
}


MapWrapper.prototype.getPathCoords = function(){
  var waypoints = [];
  this.markers.forEach(function(marker){
    waypoints.push(marker.getPosition());
  });
  // the following uses a regex to strip the waypoints of all non-required symbols
  var path = "points=" + waypoints.join("|").replace(/[^0-9\.,-|]/g, "");
  return path;
}

MapWrapper.prototype.sendRoute = function(callback){
  var coordsPath = this.getPathCoords();
  var request = new XMLHttpRequest();
  request.open('GET', "https://roads.googleapis.com/v1/nearestRoads?" + coordsPath + "&key=AIzaSyABlvOoV4fdwNU5j_ueBT-0-BROqg51Gw0");
  request.addEventListener('load', callback);
  request.send();
}

MapWrapper.prototype.showRoute = function(){
  var finalWaypoints = [];
  var that = this;
  this.sendRoute(function(){
    if(this.status !== 200)return;
    var jsonString = this.responseText;
    var data = JSON.parse(jsonString);

    for (point of data.snappedPoints){
      var snappedPathCoords = new google.maps.LatLng(point.location.latitude, point.location.longitude);
      finalWaypoints.push(snappedPathCoords)};

      var route = new google.maps.Polyline({
        map: this.googlemap,
        path: finalWaypoints,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      })
      route.setMap(that.googleMap);

    })
}

module.exports = MapWrapper;