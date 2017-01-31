var http      = require("http");
var fs        = require("fs");
var port      = 3000;
var socketIo  = require('socket.io');
//====================================^^^DEPENDENCIES&VARIABLES^^^=========================================//
var server = http.createServer((req, res) => {
	console.log("Someone connected by http");
	fs.readFile("index.html", "utf-8", (error, fileData)=>{
		if (error) {
			res.writeHead(500, {"content-type":"text/html"});
			res.end(error);
		}
		else {
			res.writeHead(200, {"content-type":"text/html"});
			res.end(fileData);
		}
	});
});
//====================================^^^SERVER-DEFINED^^^========================================//
var socketUsers = [];
var socketMessages = [];

var io = socketIo.listen(server);
io.sockets.on('connect', (socket) =>{
	console.log("someone connected by socket");

	socketUsers.push({
		socketID: socket.id,
		name: "Anonymous"
	})
	io.sockets.emit('users', socketUsers);
});


io.sockets.on('messageToServer', (messageObj)=>{
	console.log("Someone sent the following message: ");
	// socketMessages.push(message.message);
	// socketMessages.emit('messages', socketMessages);

	io.sockets.emit("messageToClient", {
		message: messageObj.message,
		date: new Date()
	});
});


//====================================^^^SOCKETS-DEFINED^^^========================================//
server.listen(port);
console.log("listening on port: " + port);
//====================================^^^SERVER-INITIALIZED^^^====================================//


//-------------------------------------------------------------
// var server = http.createServer((req, res) => {
// 	console.log("Someone connected by http");
// 	fs.readFile("index.html", "utf-8", (error, fileData)=>{
// 		if (error) {
// 			res.writeHead(500, {"content-type":"text/html"});
// 			res.end(error);
// 		}
// 		else {
// 			res.writeHead(200, {"content-type":"text/html"});
// 			res.end(fileData);
// 		}
// 	});
// });//
//-------------------------------------------------------------



