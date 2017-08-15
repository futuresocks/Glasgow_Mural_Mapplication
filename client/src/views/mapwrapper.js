var info;
var ImageGetter = require('./imageGetter.js');

var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(
    container, {
      center: center,
      zoom: zoom
    });
  this.googleMap.setOptions({draggable: true, zoomControl: true, scrollwheel: false, disableDoubleClickZoom: true});
  this.markers = [];
  this.showDirections = true;
  this.directionDisplay = new google.maps.DirectionsRenderer({
      map: this.googleMap
  });;
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
    var seen = "Not Spotted! ✗"
    if (mural.checked){
      seen = "Spotted! ✓"
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
// -----------------Custom route finder---------
// MapWrapper.prototype.getOrigin = function(){
//   var origin = this.markers[0].getPosition();
//   return origin.toString().replace(/[^0-9\.,-|]/g, "");
// }

// MapWrapper.prototype.getDestination = function(){
//   var destination = this.markers[this.markers.length-1].getPosition();
//   return destination.toString().replace(/[^0-9\.,-|]/g, "");
// }

// MapWrapper.prototype.getWaypoints = function(){
//   var waypoints = [];
//   this.markers.forEach(function(marker){
//     waypoints.push(marker.getPosition());
//   });
//   waypoints.splice(0, 1);
//   waypoints.splice(waypoints.length-1, 1);
//   // the following uses a regex to strip the waypoints of all non-required symbols
//   var path = "&waypoints=" + waypoints.join("|").replace(/[^0-9\.,-|]/g, "");
//   return path;
// }

// MapWrapper.prototype.sendRoute = function(callback){
//   var origin = this.getOrigin();
//   var destination = this.getDestination();
//   var waypoints = this.getWaypoints();
//   var request = new XMLHttpRequest();
//   request.open('GET', "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + waypoints + "&key=AIzaSyAFHPuQ6E7xLZH1i5Vgue5TpRAA4uKmpvI");
//   request.addEventListener('load', callback);
//   request.send();
// }

// MapWrapper.prototype.showRoute = function(){
//   var finalWaypoints = [];
//   var that = this;
//   this.sendRoute(function(){
//     if(this.status !== 200)return;
//     var jsonString = this.responseText;
//     var data = JSON.parse(jsonString);
//     console.log(data);

//     // for (point of data.snappedPoints){
//     //   var snappedPathCoords = new google.maps.LatLng(point.location.latitude, point.location.longitude);
//     //   finalWaypoints.push(snappedPathCoords)};

//     //   var route = new google.maps.Polyline({
//     //     map: this.googlemap,
//     //     path: finalWaypoints,
//     //     strokeColor: "#FF0000",
//     //     strokeOpacity: 1.0,
//     //     strokeWeight: 2
//     //   })
//     //   route.setMap(that.googleMap);

//     })
// ----------------------------------------


MapWrapper.prototype.showRoute = function(map, markers){


function initMap(map, markers, directionsDisplay) {
    var pointA = new google.maps.LatLng(markers[0].getPosition().lat(), markers[0].getPosition().lng()),
        pointB = new google.maps.LatLng(markers[21].getPosition().lat(), markers[21].getPosition().lng()),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService
        
    // get route from A to B
    var waypoints = [];
for(marker of markers){
  var coords = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
    var waypoint = {location: coords, stopover: false};
    waypoints.push(waypoint);
}

calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, waypoints, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, waypts, directionsDisplay) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        waypoints: waypts,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.WALKING
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

if(this.showDirections){
initMap(map, markers, this.directionDisplay);
this.showDirections = false;
}else{
  this.directionDisplay.set('directions', null);
  this.showDirections = true;
}
}

module.exports = MapWrapper;