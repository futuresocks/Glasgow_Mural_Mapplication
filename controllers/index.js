var express = require("express");
var router = express.Router();
var path = require('path');
var MuralQuery = require('../client/db/muralQuery.js');
var query = new MuralQuery();

router.use('/api', require("./muralapi.js"));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

router.post('/', function(req, res){
  var mural = req.body;
  // console.log(mural);
  var boolean = false;
  if(mural.checked){
   boolean = false;
  }else{
   boolean = true;
  }

  query.update(mural, boolean);
})

module.exports = router;