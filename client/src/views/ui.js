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

    murals.forEach(function(mural){
      console.log(mural.title)
    })

    
    // mapDiv.style.height = '200px';
    // mapDiv.style.width = '200px';

    // var center = {lat: mural.latlng[0], lng: mural.latlng[1]};
    // var zoom = 10;
    // var mainMap = new MapWrapper(mapDiv, center, zoom);
  }
}

module.exports = UI;