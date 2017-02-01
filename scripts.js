var socketio = io.connect('http://127.0.0.1:3000');

// ============================================ESTABLISH_SOCKET_CONNECTION========================================================================
socketio.on('users', (socketUsers)=>{
	console.log(socketUsers);
	var newHTML = "";
	socketUsers.map((currSocket, index)=>{
		newHTML += '<li class"user">' + currSocket.name + '</li>';
	});
	document.getElementById('userNames').innerHTML = newHTML;
});
// ============================================CHAT_MESSAGE_HANDLER=============================================================================

function sendChatMessage(){
	event.preventDefault();
	var messageToSend = document.getElementById('chat-message').value;
	socketio.emit('messageToServer', {
		message: messageToSend,
		name: "Anonymous"
	});
};
// ====================================================================================================================
socketio.on('messageToClient', (messageObj)=>{
	document.getElementById('userChats').innerHTML += ('<div class="message" style="margin-top: 4px"> <p style="float: right">' + messageObj.message  + '</p></div>');
	console.log(messageObj.date)
	//+ '--' + messageObj.hours + ':' + messageObj.minutes + ':' + messageObj.seconds // <--- the message timestamp
});
// ====================================================================================================================
var scrolled = false;

setInterval(function(){
	if(!scrolled){
		var element = document.getElementById("chat-box");
		element.scrollTop = element.scrollHeight;
	}
},100);

$("#yourDivID").on('scroll', function(){
    scrolled=true;
});


// // ====================================================================================================================
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// var mouseDown = false;
// var color = colorPick;
// var thickness = 10;
// var mousePosition = {};
// var lastMousePosition = null;
// var colorPick = document.getElementById('color-picker');
// var thicknessPick = document.getElementById('thickness-picker');

// colorPick.addEventListener('change', (event)=>{
//     color = colorPick.value;
// });

// thicknessPick.addEventListener('change',(event)=>{
// 	color = thicknessPicker.value;
// });


// // var colorPick = document.getElementById('color-picker')
// // var thicknessPicker = document.getElementById('thickness')

// // colorPick.addEventListener('change', (event)=>{
// //     color = colorPick.value;
// // });
// // thicknessPicker.addEventListener('change',(event)=>{
// //     thickness = thicknessPicker.value;
// // })



// canvas.addEventListener('mousedown', (event)=>{
// 	mouseDown = true;
// });

// canvas.addEventListener('mouseup', (event)=>{
// 	mouseDown = false;
// });
// canvas.addEventListener('mousemove', (event)=>{
// 	if (mouseDown) {
// 		var magicBrushX = event.pageX - canvas.offsetLeft;
// 		var magicBrushY = event.pageY - canvas.offsetTop;
// 		mousePosition = {
// 			x: magicBrushX,
// 			y: magicBrushY
// 		}
// 		console.log(mousePosition);
// 		if (lastMousePosition != null) {
// 			context.strokeStyle = color;
// 			context.lineJoin = 'round';
// 			context.lineWidth = thickness;
// 			context.beginPath();
// 			context.moveTo(lastMousePosition.x,lastMousePosition.y);
// 			context.lineTo(mousePosition.x, mousePosition.y);
// 			context.stroke();
// 			context.closePath();
// 		}

// 		var drawingDataForServer = {
// 			mousePosition: mousePosition,
// 			lastMousePosition: lastMousePosition,
// 			color: color,
// 			thickness: thickness
// 		}

// 		lastMousePosition = {
// 			x: mousePosition.x,
// 			y: mousePosition.y
// 		}

// 		socketio.emit('drawingToServer', drawingDataForServer);

// 		socketio.on('drawingToClients', (drawingData)=>{
// 			context.strokeStyle = drawingData.color;
// 			context.lineJoin = 'round';
// 			context.lineWidth = drawingData.thickness;
// 			context.beginPath();
// 			context.moveTo(drawingData.lastMousePosition.x,drawingData.lastMousePosition.y);
// 			context.lineTo(drawingData.mousePosition.x, drawingData.mousePosition.y);
// 			context.stroke();
// 			context.closePath();
// 		});

// 	}
// })
