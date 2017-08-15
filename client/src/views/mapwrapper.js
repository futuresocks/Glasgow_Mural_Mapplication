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


MapWrapper.prototype.showRoute = function(map, markers){
// --------------------------------
function initMap(map, markers) {
    var pointA = new google.maps.LatLng(markers[0].getPosition().lat(), markers[0].getPosition().lng()),
        pointB = new google.maps.LatLng(markers[21].getPosition().lat(), markers[21].getPosition().lng()),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        })
        
    // get route from A to B
    var waypoints = [];
for(marker of markers){
  var coords = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
    var waypoint = {location: coords, stopover: false};
    waypoints.push(waypoint);
}

calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, waypoints);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, waypts) {
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

initMap(map, markers);
}

module.exports = MapWrapper;