var mongoose = require('mongoose')

var budgetSchema = new mongoose.Schema({
  username:String,
  value:Number,
  item:String,
  expInc:String,
  idsUsr:String,
  created:{type: Date, default:Date.now},
  users:{
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        },
        username:String
  }
})
module.exports = mongoose.model("Budget", budgetSchema);
