/**
 * Created by balazs on 10/15/2016.
 */
var mongoose = require('mongoose');
var voterSchema = mongoose.Schema({
    facebook: {
        id: String,
        name: String
    },
    vote: {
        timestamp: String,
        votedfor: String
    }
});

module.exports = mongoose.model('Voter', voterSchema);