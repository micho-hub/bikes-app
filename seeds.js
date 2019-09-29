var mongoose = require("mongoose");
var Bikes   = require("./models/bikes");
var Comment = require("./models/comment")

function seedDB(){
  Bikes.remove({}, function(err ){
    console.log("Remove Bikes");
    data.forEach(function(seed){
      Bikes.create(seed, function(err, bike){
        if(err){
          console.log(err);
        }else{
          console.log("Added New Posts");
          Comment.create(
            {
              text:"Nice place but no have internet",
              author:"Pamukle"
            }, function(err, comment){
              if(err){
                console.log(err);
              }else{
                bike.comments.push(comment);
                bike.save();
                console.log("Created new comment")
              }

            }
          )
        }
      })
    })
  });
}
var data=[
  {
    title:"Big ride on nice day",
    image:"https://cdn.pixabay.com/photo/2017/09/09/15/31/houston-texas-bike-route-2732342__340.jpg",
    text:"The 30-year-old put in a number of shifts on the front of the bunch during the cold and rainy conditions of stage one from Barnsley to Bedale, which was eventually won in a sprint finish by Dutchwoman Lorena Wiebes "
  },
  {
    title:"I like to ride all time ",
    image:"https://cdn.pixabay.com/photo/2016/09/26/16/59/unbelievable-1696447__340.jpg",
    text:"The 30-year-old put in a number of shifts on the front of the bunch during the cold and rainy conditions of stage one from Barnsley to Bedale, which was eventually won in a sprint finish by Dutchwoman Lorena Wiebes "
  },
  {
    title:"Great filling and nice nautre",
    image:"https://cdn.pixabay.com/photo/2017/10/02/19/27/mountain-bike-2809895__340.jpg",
    text:"The 30-year-old put in a number of shifts on the front of the bunch during the cold and rainy conditions of stage one from Barnsley to Bedale, which was eventually won in a sprint finish by Dutchwoman Lorena Wiebes "
  },

];

module.exports = seedDB;
