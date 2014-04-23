var express = require('express');
var app = express();
var http = require('http')
var server = http.createServer(app)

//express static app
app.use(express.static(__dirname + '/public'));

//socket IO
var io = require('socket.io').listen(server)

io.configure(function(){
  io.set('log level', 1)
})


io.sockets.on('connection', function (socket) {
  socket.emit('connected', {})

  socket.on('outgoing_sdp_offer', function (data) {
    console.log('outgoing_sdp_offer')
    io.sockets.emit('incoming_sdp_offer', data)
  });

  socket.on('outgoing_sdp_answer', function (data) {
    console.log('outgoing_sdp_answer')
    io.sockets.emit('incoming_sdp_answer', data)
  });

  socket.on('outgoing_ice_candidate', function (data) {
    console.log(data)
    io.sockets.emit('incoming_ice_candidate', data)
  });
});

//run our webapp
console.log('Spinning up and listening on port: 8080')
server.listen(8080);


