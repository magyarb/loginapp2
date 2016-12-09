/**
 * Created by balazs on 12/7/2016.
 */
var mongoose = require('mongoose');
var instapicSchema = mongoose.Schema({
  id: Number,
  url: String,
  tag: String
});

module.exports = mongoose.model('Instapic', instapicSchema);
