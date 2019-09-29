var express = require("express");
router = express.Router(),
  Budget = require("../models/budget"),
  User = require("../models/user"),
  Budtotal = require("../models/budtotal"),
  middleware = require("../middleware")


router.get("/all", middleware.isLoggedIn, function(req, res) {
  Budget.find({}, function(err, budgets) {
    if (err) {
      console.log(err)

    } else {

      var reqUserId = req.user._id;

      Budget.aggregate([{
        $match: {
          idsUsr: String(reqUserId)
        }
      }], function(err, last) {
        if (err) {
          console.log(err)
        } else {
          var totUsrString = req.user._id;
          Budtotal.find({
            userId: String(reqUserId)
          }, function(err, usr) {
            if (err) {
              console.log(err)
            } else {
              console.log(usr[0].total)
              var usr =usr[0].total;
              res.render("bikes/allbudget", {
                last: last,
                usr: usr
              })
            }
          })
        }
      })
    }
  })
})

router.get("/budget", function(req, res) {
  res.render("budget/budget");
});

router.post("/all", middleware.isLoggedIn, function(req, res) {
  var expInc = req.body.expInc;
  var value = req.body.value;
  var item = req.body.item;
  var total = req.body.total;
  var inc = {
    item: item,
    expInc: expInc,
    total: total,
    value: value
  }
  if (expInc === "inc") {


    Budget.create(inc, function(err, incBud) {
      if (err) {
        console.log(err)
      } else {

        incBud.users.id = req.user._id;
        incBud.idsUsr = incBud.users.id
        incBud.users.username = req.user.username;
        incBud.save()

        var reqUserId = req.user._id;
        Budtotal.findOne({
          userId: String(reqUserId)
        }).exec(function(err, newTotalToUpdate) {
          if (err) {
            console.log(err)
          } else {
            var reqUserId = req.user._id;
            Budtotal.aggregate([{
              $match: {
                userId: String(reqUserId)
              }
            }], function(err, delMatch) {
              if (err) {
                console.log(err)
              } else {
                newTotalToUpdate.usertotal.id = req.user._id;
                newTotalToUpdate.usertotal.username = req.user.username;
                newTotalToUpdate.total = incBud.value;
                console.log(delMatch[0].total)
                newTotalToUpdate.total = delMatch[0].total + incBud.value;
                newTotalToUpdate.save()
                res.redirect("/all")
              }
            })
          }
        })
      }
    })
  } else {
    Budget.create(inc, function(err, incBud) {
      if (err) {
        console.log(err)
      } else {
        incBud.users.id = req.user._id;
        incBud.idsUsr = incBud.users.id
        incBud.users.username = req.user.username;
        incBud.save()
        var reqUserId = req.user._id;
        Budtotal.findOne({
          userId: String(reqUserId)
        }).exec(function(err, newTotalToUpdate) {
          if (err) {
            console.log(err)
          } else {
            var reqUserId = req.user._id;
            Budtotal.aggregate([{
              $match: {
                userId: String(reqUserId)
              }
            }], function(err, delMatch) {
              if (err) {
                console.log(err)
              } else {
                newTotalToUpdate.usertotal.id = req.user._id;
                newTotalToUpdate.usertotal.username = req.user.username;
                newTotalToUpdate.total = incBud.value;
                console.log(delMatch[0].total)
                newTotalToUpdate.total = delMatch[0].total - incBud.value;
                newTotalToUpdate.save()
                res.redirect("/all")
              }
            })
          }
        })
      }
    })
  }

})

router.delete("/all/:id", middleware.isLoggedIn, function(req, res) {
  Budget.findByIdAndDelete(req.params.id, function(err, deleteItem) {
    if (err) {
      console.log(err)
    } else {
      if (deleteItem.expInc === "inc") {
        var reqUserId = req.user._id;
        Budtotal.findOne({
          userId: String(reqUserId)
        }).exec(function(err, newTotalToUpdate) {
          if (err) {
            console.log(err)
          } else {
            var reqUserId = req.user._id;
            Budtotal.aggregate([{
              $match: {
                userId: String(reqUserId)
              }
            }], function(err, delMatch) {
              if (err) {
                console.log(err)
              } else {
                console.log(delMatch[0].total)
                newTotalToUpdate.total = delMatch[0].total - deleteItem.value;
                newTotalToUpdate.save()
                res.redirect("/all")
              }
            })
          }
        })
      } else {
        var reqUserId = req.user._id;
        Budtotal.findOne({
          userId: String(reqUserId)
        }).exec(function(err, newTotalToUpdate) {
          if (err) {
            console.log(err)
          } else {
            var reqUserId = req.user._id;
            Budtotal.aggregate([{
              $match: {
                userId: String(reqUserId)
              }
            }], function(err, delMatch) {
              if (err) {
                console.log(err)
              } else {
                newTotalToUpdate.total = delMatch[0].total + deleteItem.value;
                newTotalToUpdate.save()
                res.redirect("/all")
              }
            })
          }
        })
      }
    }
  })
})

module.exports = router;
