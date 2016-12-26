var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require('morgan');

app.use(morgan('dev'));

var usernames = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//console.log('Connection opened for Chat');
	
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', socket.username, data);
	});
	

	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
	});

	socket.on('chat message', function(msg){
		//var msgS = socket.username + ': ' + msg;
		//console.log(msgS);
		console.log('sending message ' + msg)
    	io.emit('chat message', socket.username + ': ' +  msg);
	});

	// socket.on('notifyUser', function(user){
 //    	io.emit('notifyUser', user);
 //  	});
	// socket.on('notifyUser', function(user){
	// 	console.log('Notifiying User ' +  user);
 //    	io.emit('notifyUser', user);
 //  	});
});

http.listen(3001, function(){
  console.log('listening on *:3000');
});
