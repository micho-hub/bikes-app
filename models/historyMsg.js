var mongoose = require('mongoose');

var msnSchema = new mongoose.Schema({
  message:String,
  username:String,
  msgCreate:{type:Date, default:Date.now}
})

module.exports= mongoose.model("Msn", msnSchema);
