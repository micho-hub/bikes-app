var express = require("express");
var router  = express.Router({mergeParams: true});
var Bikes   = require("../models/bikes");
var Comment = require("../models/comment");
var middleware =require("../middleware");

router.get("/new",middleware.isLoggedIn, function(req,res){
  Bikes.findById(req.params.id, function(err, bikes){
    if(err){
      console.log(err)
    }else{
      res.render("comments/new", {bikes:bikes})
    }
  });
});
router.post("/", function(req,res){
  Bikes.findById(req.params.id, function(err, bikes){
    if(err){
      console.log(err)
      res.redirect("/bikes/all/1")
    }else{
        Comment.create(req.body.comment, function(err, comment){
          if(err){
            req.flash("error", "Something went wrong")
            console.log(err);
          }else{
            comment.author.id = req.user._id;
            console.log(comment.author.id)
            comment.author.username = req.user.username;
            comment.save();
            bikes.comments.push(comment);
            bikes.save();
            console.log(comment);
            req.flash("success","Successfully added comment");
            res.redirect("/bikes/"+bikes._id)
          }
        })
    }
  })
});
router.get("/:comment_id/edit", middleware.commentOwnership,function(req,res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    }else{
        res.render("comments/edit", {bikes_id: req.params.id, comment:foundComment});
    }
  });
});
router.put("/:comment_id", middleware.commentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, edit){
    if(err){
      res.redirect("back")
    }else{
      res.redirect("/bikes/"+req.params.id)
    }
  })
});
router.delete("/:comment_id", middleware.commentOwnership,function (req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }else{
      req.flash("success","Comment deleted")
      res.redirect("/bikes/"+req.params.id)
    }
  });
});
module.exports =router;
