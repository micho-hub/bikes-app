$(function(){
  var socket=io.connect('http://localhost:9000')
  var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
  var d =$(".chatDiv")
  var keypress =$(".vertical-align")

d.scrollTop(d.prop("scrollHeight"));
  keypress.keypress(function (e){
    alert("Please write some message")
  }else{
      if(e.keyCode === 13){
         	socket.emit('new_message', {message : message.val()})
      }
  })

	send_message.click(function(){
    if(message.val()===""){
      alert("Please write some message")
    }else{
      	socket.emit('new_message', {message : message.val()})

    }

	})

  send_username.val(function(){
      socket.emit('change_username', {username : username.text()})
      username.html()

	})
	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")

console.log(data.message)
	})


	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})

})
