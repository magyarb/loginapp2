/**
 * Created by balazs on 10/15/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

var graph = require('fbgraph');

var Voter = require('../models/voter');

var friends = new Object();
/*
router.get('/', function(req, res){
    FB.setAccessToken(req.user.facebook.token);
    console.log(req.user.facebook.token);
    FB.options({version: 'v2.6'});
    var data = {};
    FB.api('459722457389411?fields=members', function (fbres) {
        if(!fbres || fbres.error) {
            console.log(!fbres ? 'error occurred' : fbres.error);
            return;
        }
        fbres.members.data.forEach(function (element, index, array) {
            console.log(element.id);
            console.log(element.name);

            var newVoter = new Voter();
            newVoter.facebook.id = element.id;
            newVoter.facebook.name = element.name;

            newVoter.save(function(err){
                if(err)
                    throw err;
            });
        });
        res.render('face',{
            res:fbres
        });
    });

});
*/
router.get('/getvoters', function(req, res){
    Voter.remove({}, function(err) {
        if (!err) {

        }
        else {

        }
    });
    graph.setAccessToken(req.user.facebook.token);
    console.log(req.user.facebook.token);
    graph.setVersion("2.6");
    graph.get("459722457389411/members", doSomething);

    function doSomething(error, response){
        response.data.forEach(function (element, index, array) {
            //console.log(element.id);
            console.log(element.name);

            var newVoter = new Voter();
            newVoter.facebook.id = element.id;
            newVoter.facebook.name = element.name;

            newVoter.save(function(err){
                if(err)
                    throw err;
            });
        });
        if (typeof response.paging.next !== "undefined"){
            console.log(response.paging.next);
            graph.get(response.paging.next, doSomething);
        }
        else
        {
            req.flash('success_msg', 'Got voters');

            res.redirect('/');
        }
    }
});

router.get('/showvoters', function(req, res){
    Voter.find({}, function(err, voters) {

        res.render('face',{
            res:voters
        });
    });
});

router.get('/voters', function(req, res){
  Voter.find({}, function(err, voters) {
    //res.send(voters);
    if(req.isAuthenticated()){

      res.send("Welcome, " + req.user.facebook.name + "!");
      //res.send(voters);
    } else {
      //req.flash('error_msg','You are not logged in');
      res.send('not logged in');
    }
  });
});

router.all('*', function(req, res){
  res.status(404).send("Not found.");
});



module.exports = router;
