var UI = require('./views/ui.js');

var onLoad = function(){
var url = "http://localhost:3000/api/murals";
makeRequest(url, requestComplete);

// document.getElementById('mural-selection').onchange = (function() {
//   document.getElementsByTagName('audio')[0].play();
//   return false;
};

var makeRequest = function(url, callback){
var request = new XMLHttpRequest();
request.open('GET', url);
request.addEventListener('load', callback);
request.send();
};

var requestComplete = function(){
if(this.status !== 200)return;
var muralsString = this.responseText;
var murals = JSON.parse(muralsString);
var ui = new UI(murals);
};


window.addEventListener("load", onLoad);