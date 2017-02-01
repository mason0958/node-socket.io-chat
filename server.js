var http          = require("http");
var fs            = require("fs");
var port          = 3000;
var socketIo      = require('socket.io');
var connect       = require('connect');
var serveStatic   = require('serve-static');
//====================================DEPENDENCIES=========================================//
var server = http.createServer((req, res) => {
	console.log("Someone connected by http");
	
	//----------------------------------------------------------------------
	// fs.readFile("index.html", "utf-8", (error, fileData)=>{
	// 	if (error) {
	// 		res.writeHead(500, {"content-type":"text/html"});
	// 		res.end(error);
	// 	}
	// 	else {
	// 		res.writeHead(200, {"content-type":"text/html"});
	// 		res.end(fileData);
	// 	}
	// });
	//-----------------------------------------------------------------------

});
connect().use(serveStatic(__dirname)).listen(8080, ()=>{
    console.log('Static server is running on port 8081')    
});
//====================================SERVER-DEFINED========================================//
var socketUsers = [];
var socketMessages = [];

var io = socketIo.listen(server);
io.sockets.on('connect', (socket) =>{
	console.log("someone connected by socket");

	var clientIp = socket.request.connection.remoteAddress;
    socket.emit('clientIP',{ip : clientIp}); //emit it back to client

    console.log(clientIp);

	socketUsers.push({
		socketID: socket.id,
		name: "Anonymous"
	})
	io.sockets.emit('users', socketUsers);

	socket.on('messageToServer', (messageObj)=>{
		console.log("Someone sent the following message: ");
		// socketMessages.push(message.message);
		// socketMessages.emit('messages', socketMessages);
		var d = new Date();
		var dHours = d.getHours();
		var dMinutes = d.getMinutes();

		if (dHours > 12) {
			dHours = dHours - 12;
		}
		io.sockets.emit("messageToClient", {
			message: messageObj.message,
			seconds: d.getSeconds(),
			minutes: dMinutes,
			hours: dHours
		});
	});

	socket.on('drawingToServer', (drawingData)=>{
		console.log('drawing received from client');
		if (drawingData.lastMousePosition != null) {
			io.sockets.emit('drawingToClients', drawingData);
		}
	})
});
//====================================SOCKETS-DEFINED========================================//
server.listen(port);
console.log("listening on port: " + port);
//====================================SERVER-INITIALIZED====================================//
