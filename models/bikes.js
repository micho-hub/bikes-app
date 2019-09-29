var mongoose = require("mongoose");
var bikeSchema = new mongoose.Schema({
  title:String,
  headimg:String,
  image:String,
  text:String,
  author:{
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:String
  },
  owner:{
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:String
  },
  comments: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
});
module.exports = mongoose.model("Bikes", bikeSchema);
