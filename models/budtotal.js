var mongoose = require("mongoose");
var budtotalSchema = new mongoose.Schema({

  total:Number,
  userId:String,
  created:{type: Date, default:Date.now},

usertotal:{
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        },
        username:String
  }
})
module.exports = mongoose.model("Budtotal", budtotalSchema)
