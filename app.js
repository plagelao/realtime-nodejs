var app = require('express').createServer();
var io = require('socket.io').listen(app);

require('jade');
app.set('view engine', 'jade');
app.set('view options', {layout: false});

app.get('/*.(js|css)', function(req, res){
  res.sendfile("./public"+req.url);
});

app.get('/', function(req, res){
  res.render('index');
});

theport = process.env.PORT || 2000;
app.listen(theport);

var activeClients = 0;

io.sockets.on('connection', function(client){
  activeClients +=1;
  io.sockets.send(activeClients)
  client.on('disconnect', function(){clientDisconnect(client)});
});

function clientDisconnect(client){
  activeClients -=1;
  client.broadcast.send(activeClients)
}
