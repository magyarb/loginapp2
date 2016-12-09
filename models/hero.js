/**
 * Created by balazs on 11/29/2016.
 */
var mongoose = require('mongoose');
var heroSchema = mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Hero', heroSchema);
