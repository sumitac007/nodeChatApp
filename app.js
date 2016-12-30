
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){

	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		//socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
	});
	socket.on('chat message', function(msg){
    	io.emit('chat message', socket.username + ': ' + msg);
  	});
});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on * : ' + port);
});