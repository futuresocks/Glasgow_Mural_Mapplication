var MapWrapper = require('./mapWrapper.js');
var Murals = require('../models/murals')


var UI = function(){
  var murals = new Murals();
  murals.all(function(result){
    UI.prototype.render(result);
    UI.prototype.populateChecklist(result);
  });
}

UI.prototype = {
  render: function(murals){
    var center = {lat: 55.861865, lng: -4.252625};
    var zoom = 15;
    var mapDiv = document.querySelector('#main-map')
    var mainMap = new MapWrapper(mapDiv, center, zoom);

    murals.forEach(function(mural){
      mainMap.addMarker(mural.coords, mural.title, mural.imageTags);
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
   }

 }

 module.exports = UI;