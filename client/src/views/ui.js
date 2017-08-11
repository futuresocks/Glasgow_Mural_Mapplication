var MapWrapper = require('./mapWrapper.js');

var UI = function(murals){
    this.render(murals);
}

UI.prototype = {
    render: function(murals){
      console.log(murals);
      murals.forEach(function(mural){





        mapDiv.style.height = '200px';
        mapDiv.style.width = '200px';

        var center = {lat: mural.latlng[0], lng: mural.latlng[1]};
        var zoom = 10;
        var mainMap = new MapWrapper(mapDiv, center, zoom);
      })

    }



}

module.exports = UI;