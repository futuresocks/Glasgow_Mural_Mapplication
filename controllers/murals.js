var express = require("express");
var muralsRouter = new express.Router();


var MuralQuery = require('../client/db/muralQuery.js');
var query = new MuralQuery();

muralsRouter.get("/", function(req, res){
  res.json({data:"hello"});
});

module.exports = muralsRouter;