var Bikes = require("../models/bikes");
var Comment = require("../models/comment");
var express =require('express')
var app= express()
var middelwareObj ={};

middelwareObj.checkOwnership= function(req,res,next){
    if(req.isAuthenticated()){
      Bikes.findById(req.params.id, function(err, editPost){
        if(err){req.flash("error", "Not find")
          res.redirect("back");
        }else{
          if(editPost.author.id.equals(req.user._id)){
            next();
          }else{
            req.flash("error", "You dont have permission")
            res.redirect("back")
          }
        }
      });
    }else{
      req.flash("error", "You need to Login first")
        res.redirect("back");
    }
}
middelwareObj.commentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, commentPost){
      if(err){
        res.redirect("back");
      }else{
        if(commentPost.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that")
          res.redirect("back")
        }
      }
    });
  }else{
    req.flash("error", "You need to be Logged in")
      res.redirect("back");
  }
}

middelwareObj.commentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, commentPost){
      if(err){
        res.redirect("back");
      }else{
        if(commentPost.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that")
          res.redirect("back")
        }
      }
    });
  }else{
    req.flash("error", "You need to be Logged in")
      res.redirect("back");
  }
}

middelwareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    req.flash("error", "Please login First!");
    res.redirect("/login");
  }
}

module.exports = middelwareObj;
