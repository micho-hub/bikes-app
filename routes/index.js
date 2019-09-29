var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Budtotal = require("../models/budtotal")
var passport = require("passport")

router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/register", function(req, res) {
  res.render("user/register")
});

router.post("/register", function(req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message)
      return res.redirect("/register")
    } else {
      passport.authenticate("local")(req, res, function() {
        req.flash("success", "Welcome" + user.username)
        Budtotal.create({
            total: 0,
            userId: user._id
          },
          function(err, firstTotal) {
            if (err) {
              console.log(err)
            } else {
              firstTotal.usertotal.id = req.user._id;
              firstTotal.usertotal.username = req.user.username;
              firstTotal.save()
            }
          })
        res.redirect("/bikes/all/1");
      });
    }
  });
});

router.get("/login", function(req, res) {
  res.render("user/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/bikes/all/1",
  failureRedirect: "/login"
}), function(req, res) {
  req.flash("error", "Logged you in!");
  res.redirect("/bikes/all/1");
});

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("error", "Logged you out!");
  res.redirect("/bikes/all/1")
});

module.exports = router;
