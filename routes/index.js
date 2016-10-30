var express = require('express');
var router = express.Router();
var Voter = require('../models/voter');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	var fbname = req.user.facebook.name;
	var instaname = req.user.instagram.username;
	Voter.find({'facebook.id' : req.user.facebook.id}, function(err, voters) {
		if(voters.length < 1)
		{
			req.user.voting.canVote = false;
		}
		else
		{
			req.user.voting.canVote = true;
		}
		req.user.save(function(err) {
			if (err) { return self.error(err); }
		});
		res.render('index',{
			fbname:fbname,
			instaname:instaname,
			voter:req.user.voting.canVote
		});
	});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
