var express = require('express');
var app = express();
var server = app.listen(3000);

var io = require('socket.io')(server);


app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

function _emitter(data){
  io.sockets.emit('mysocket', data);
  //console.log(data);
}
