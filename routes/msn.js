var express     = require("express"),
    router      = express.Router(),
    mongoose    = require('mongoose'),
    middleware  = require("../middleware"),
    bodyParser  = require('body-parser'),
    User        = require("../models/user"),
    Msn         = require('../models/historyMsg');


var app =express()
var server= app.listen(9000)
mongoose.connect("mongodb://127.0.0.1:27017/bike",{useNewUrlParser: true});
var io = require('socket.io')(server)
router.get("/chat",middleware.isLoggedIn, function(req, res){
  Msn.find({}, function(err, all){
    if(err){
      console.log(err)
    }else{
      res.render("msn/msn",{all:all})

      io.on('connect', function(socket){
            socket.username=req.user.username;
      })
    }
  })

})

io.on('connect', function(socket){
  console.log("New user connected")
  socket.on('change_username',function(data){
    socket.username = data.username
  })
  socket.on('new_message', function(data){
    Msn.create(data, function(err, newMessage){
      if(err){
        console.log(err)
      }else{
        newMessage.msessage=data.message;
        newMessage.username=socket.username
        newMessage.save(function(err){
          if(err){
            console.log(err)
          }
          io.sockets.emit('new_message', {message:data.message, username:socket.username})
        })
      }
    })
  })
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', {username:socket.username})
  })
});

module.exports = router;
