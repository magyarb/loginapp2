/**
 * Created by balazs on 2016. 09. 17..
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var ig = require('instagram-node').instagram();

var User = require('../models/user');
var Instapic = require('../models/instapic');
// Register
router.get('/', function (req, res) {
  ig.use({access_token: req.user.instagram.token});
  ig.user_self_media_recent(function (err, medias, pagination, remaining, limit) {
    //res.send(medias[0].images.standard_resolution.url);
    res.render('insta', {
      medias: medias
    });
  });

});

router.post('/tag', function (req, res) {
  ig.use({access_token: req.user.instagram.token});
  /*ig.use({
   client_id: '62d282dc0e97450480f6782fc25fc2dd',
   client_secret: 'd611c1bb5dc94341810b092419fd9cbd'
   });*/
  var t = req.body.hashtag;
  ig.tag_media_recent(t, function (err, medias, pagination, remaining, limit) {
    medias.forEach(function (media) {
      Instapic.findOne({'url': media.images.standard_resolution.url}, function (err, pic) {
        if (err) {
        }
        if (pic) {
        }
        else {
          var newPic = new Instapic();
          newPic.id = 0;
          newPic.url = media.images.standard_resolution.url;
          newPic.tag = t;
          newPic.save(function (err) {
            if (err)
              throw err;
          })
        }
      });
    });
    res.redirect('/slide/' + t);
    /*ig.tag_media_recent(t, function(err, medias, pagination, remaining, limit) {
     res.render('insta',{
     medias:medias
     });
     });*/
  });
});

  router.get('/tag/:tag', ensureAuthenticated, function (req, res) {
    ig.use({access_token: req.user.instagram.token});
    /*ig.use({
     client_id: '62d282dc0e97450480f6782fc25fc2dd',
     client_secret: 'd611c1bb5dc94341810b092419fd9cbd'
     });*/
    var t = req.params.tag;
    ig.tag_media_recent(t, function (err, medias, pagination, remaining, limit) {
      medias.forEach(function (media) {
        Instapic.findOne({'url': media.images.standard_resolution.url}, function (err, pic) {
          if (err) {
          }
          if (pic) {
          }
          else {
            var newPic = new Instapic();
            newPic.id = 0;
            newPic.url = media.images.standard_resolution.url;
            newPic.tag = t;
            newPic.save(function (err) {
              if (err)
                throw err;
            })
          }
        });
      });
    });
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      //req.flash('error_msg','You are not logged in');
      res.redirect('/users/login');
    }
  }

  module.exports = router;
