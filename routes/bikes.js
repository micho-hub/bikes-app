var express = require("express");
var router = express.Router();
var Bikes  = require("../models/bikes");
var middleware =require("../middleware")


router.get("/all/:page",(req, res, next) => {
  var perPage = 8;
  var page = req.params.page || 1;
  Bikes.find({})
  .skip((perPage*page)-perPage)
  .limit(perPage)
  .exec((err, allPosts) => {
    Bikes.count((err, count) => {
      if(err)return (err);
        res.render("bikes/index", {allPosts:allPosts, current:page, pages:Math.ceil(count/perPage)
        });
    })
  })
});

router.get("/new", middleware.isLoggedIn,function(req, res){
  res.render("bikes/new")
});
router.post("/", middleware.isLoggedIn,function(req,res){
  var title = req.body.title;
  var image = req.body.image;
  var text  = req.body.text;
  var headimg = req.body.headimg;
  var author ={
    id: req.user._id,
    username:req.user.username
  }
  var newPost={title:title,image:image,text:text,author:author,headimg:headimg}
  Bikes.create(newPost, function(err, post){
    if(err){
      console.log(err);
    }else{
      console.log(post)
      res.redirect("/bikes/all/1")
    }
  });
});
router.get("/:id", function(req,res){
  Bikes.findById(req.params.id).populate("comments").exec(function(err, showPost){
    if(err){
      res.redirect("/bikes/all/1")
    }else{
      res.render("bikes/show", {showPost:showPost})
    }
  });
});
router.get("/:id/edit", middleware.checkOwnership,function(req,res){
    Bikes.findById(req.params.id, function(err, editPost){
      if(err){
        res.redirect("/bikes/all/1")
      }else{
          res.render("bikes/edit",{editPost:editPost});
      }
    });
});
router.get("/:id/edit/photo", middleware.checkOwnership, function(req, res){
  Bikes.findById(req.params.id, function(err, editPost){
    if(err){
      res.redirect("/bikes/all/1")
    }else{
        res.render("bikes/photo",{editPost:editPost});
    }
  });
})
router.put("/:id", middleware.checkOwnership,function(req,res){
  Bikes.findByIdAndUpdate(req.params.id, req.body.newPost, function(err, user){
    if(err){
      res.redirect("/bikes/all/1")
    }else{
      res.redirect("/bikes/"+req.params.id);
    }
  });
});

router.delete("/:id", middleware.checkOwnership,function(req,res){
  Bikes.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect("/bikes/all/1")
    }
  });
});

module.exports =router;
