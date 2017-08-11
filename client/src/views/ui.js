var MapWrapper = require('./mapWrapper.js');
var Murals = require('../models/murals')

var UI = function(){
  var murals = new Murals();
  murals.all(function(result){
    UI.prototype.render(result);
  });
}

UI.prototype = {
  render: function(murals){
    var center = {lat: 55.861865, lng: -4.252625};
    var zoom = 15;
    var mapDiv = document.querySelector('#main-map')
    var mainMap = new MapWrapper(mapDiv, center, zoom);

    murals.forEach(function(mural){
      mainMap.addMarker(mural.coords, mural.title);
    })
  }
  
}

module.exports = UI;