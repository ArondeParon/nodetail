var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Tail = require('tail').Tail;


app.get('/', function (req, res) {
  res.redirect('index.html')
});

app.use(express.static('public'))

tail = new Tail('/var/log/apache/access_log')
tail.on('line', function(data) {
  io.sockets.emit('web_update', {
    host: data.split(' ')[0],
    source: data.split(' ')[1]
  })
})

http.listen(8080, function(){
});
