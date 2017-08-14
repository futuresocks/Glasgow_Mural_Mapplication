var MapWrapper = require('./mapWrapper.js');
var Murals = require('../models/murals')


var UI = function(){
  var murals = new Murals();
  murals.all(function(result){
    UI.prototype.render(result);
    UI.prototype.populateChecklist(result);
    UI.prototype.showInfoPopup(result);
  });
}

UI.prototype = {
  render: function(murals){
    var center = {lat: 55.861865, lng: -4.252625};
    var zoom = 15;
    var mapDiv = document.querySelector('#main-map')
    var mainMap = new MapWrapper(mapDiv, center, zoom);

    murals.forEach(function(mural){
      mainMap.addMarker(mural.coords, mural, mural.imageTags);
    })
  },
  populateChecklist: function(murals){
    var sideNav = document.getElementById("sideList")
    murals.forEach(function(mural){
      var link = document.createElement('li');
      link.innerText = mural.id + ": " + mural.title;
      link.style.display = 'block';
      link.style.height = '30px';
      link.value = mural;
      UI.prototype.setChecked(mural, link);
      link.addEventListener('click', function(){
       UI.prototype.submitUpdate(mural);
       if(mural.checked){
        mural.checked = false;
       }else{
        mural.checked = true;
       }
       UI.prototype.setChecked(mural, link);
      })
      link.addEventListener('mousemove', function(){
        if(mural.checked){
          link.style.background = 'url("http://i.imgur.com/F6snSOJ.jpg")';
        }else{
          link.style.background = 'url("http://i.imgur.com/2SLuFJC.jpg")';
        }
      })
      link.addEventListener('mouseleave', function(){
        UI.prototype.setChecked(mural, link);
      })
      sideNav.appendChild(link);
    })
  },
  setChecked: function(mural, link){
    if(mural.checked){
      link.style.backgroundImage = 'url("http://i.imgur.com/KHL7nHS.jpg")';
    }else{
      link.style.backgroundImage = 'url("http://i.imgur.com/0BfIpuc.jpg")';
    }
  },
  submitUpdate: function(mural){
    var url = "http://localhost:3000/";
    var method = "POST";
    var postData = JSON.stringify(mural);
    var async = true;
    var request = new XMLHttpRequest();

    request.onload = function () {
       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = request.responseText; // Returned data, e.g., an HTML document.
     }

     request.open(method, url, async);
     request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
     request.send(postData);
   },
   findClosest: function(murals){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var p1 = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      var lowest = 0;
      var title = murals[0].title;
      for(var i = 0; i<murals.length; i++){
        var p2 = new google.maps.LatLng(murals[i].coords[0], murals[i].coords[1]);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(p1, p2)
        if(i === 0){
          lowest = distance;
          title = murals[i].title;
        }if(distance < lowest){
          lowest = distance;
          title = murals[i].title;
        }
      }
      alert(title);
    };
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success.bind(this), error, options);
  },
  showInfoPopup: function(murals){
    var modal = document.getElementById('myModal');
    var content = document.getElementById('modal-content');

    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.addEventListener('click', function(mural){
      modal.style.display = "block";
      var container = document.getElementById('muralText');
      var muralObject  =  {
        title: this.getAttribute('title'),
        artist: this.getAttribute('artist'),
        about: this.getAttribute('about'),
        nearby: this.getAttribute('nearby'),
        image: this.getAttribute('image')
      };

      var image = document.createElement('img');
      var title = document.createElement('p');
      var artist = document.createElement('p');
      var about = document.createElement('p');

      image.src = muralObject.image;
      title.innerText = muralObject.title;
      artist.innerText = muralObject.artist;
      about.innerText = muralObject.about;

      container.appendChild(image);
      container.appendChild(title);
      container.appendChild(artist);
      container.appendChild(about);
      
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
}


 module.exports = UI;