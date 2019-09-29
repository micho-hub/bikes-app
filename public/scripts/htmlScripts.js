function showTime(){
  var date = new Date();
   var h = date.getHours();
   var m = date.getMinutes();
   var time = h+":"+m
document.getElementById("MyClockDisplay").innerText = time;
}

showTime();
function showDate(){

  var newDate =new Date().toDateString().split(' ').slice(1).join(' ').toUpperCase()
  document.getElementById("MyDateDisplay").innerText=newDate;
}
showDate();
