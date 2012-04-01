function msgReceived(msg){
  $clientCounter.html(msg);
}

$(document).ready(function () {
  $clientCounter = $("#client_count")

  var socket = io.connect();
  socket.on('message', function(msg){msgReceived(msg)});
});
