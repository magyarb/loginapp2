/**
 * Created by balazs on 11/28/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

var Voter = require('../models/voter');
var Hero = require('../models/hero');
var Instapic = require('../models/instapic');

router.get('/show/:name', function(req, res){
  Voter.find({ 'facebook.name': { "$regex": req.params.name, "$options": "i" } }, function(err, voters) {
    res.json(voters);
  });
});

router.get('/myname', function(req, res){
  if(req.isAuthenticated()) {
    res.send(req.user.facebook.name);
  }
  else
  {
    res.send("null");
  }
});

router.post('/hero', function(req, res){
  var newHero = new Hero();
  newHero.id = req.body.id;
  newHero.name = req.body.name;
  newHero.save(function(err){
    if(err)
      throw err;
  });
});

router.get('/hero', function(req, res) {
  Hero.find({}, function(err, heroes) {
    res.json(heroes);
  });
});

router.get('/tag/:tag', function (req, res) {
  Instapic.find({'tag': req.params.tag}, function(err, pics) {
    res.json(pics);
  });
});

module.exports = router;
