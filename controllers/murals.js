var express = require("express");
var muralsRouter = new express.Router();

muralsRouter.get("/", function(req, res){
  res.json({data: " "});
});

module.exports = muralsRouter;