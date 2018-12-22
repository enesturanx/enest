var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/check_pass/:pass", function(request, response){
  var pass = request.params.pass;

  if(pass === "deneme123"){
      response.json({_success_X:true});
  }

  response.end();

});

  var _onlines = [];
  var count = 0;


io.on('connection', function(socket) {

  //Globals
  var defaultRoom = '_open';

  console.log('a user connected');
  count++;
    
    io.sockets.emit('count', {
        number: count
    });

  socket.on('disconnect', function(user){

  	//console.log(user);
  	count--;
    
    io.sockets.emit('count', {
        number: count
    });

    console.log('user disconnected');

  });

/////

socket.on('base64 file', function (msg) {
    console.log('received base64 file');
    // socket.broadcast.emit('base64 image', //exclude sender
    io.sockets.emit('base64 file',  //include sender

        {
          file: msg.file,
          fileName: msg.fileName
        }

    );
});

///

  socket.on('_istyping', function(_username){
  	socket.broadcast.emit("_utyping",_username);
  });

  //Listens for new user
  socket.on('new user', function(data) {

  	console.log("new user ?");
  	console.log(data);

  	if(_onlines.indexOf(data.user_name) == -1){
  		_onlines.push(data.user_name);
  	}

  	io.emit("_ouser",{"count": _onlines.length, "_onlines": _onlines});

  	console.log(_onlines);
  	console.log(_onlines.length);
    //data.room = defaultRoom;
    //New user joins the default room
    //socket.join(defaultRoom);
    //Tell all those in the room that a new user joined
    //io.in(defaultRoom).emit('user joined', data);
  });

  var _addimages = function(str){

    var _returned = "";

    var patt = /([a-z\-_0-9\/\:\.]*\.(webp|jpg|jpeg|png|gif))/gim;
    var ss = /(http.*\.)(jpg|png|[tg]iff?|svg)/i;
    var res = patt.test(str);
    var sdd = str.match(patt);
    if(res){
      for(i=0;i<sdd.length;i++){
        _returned = _returned + "<img src=\""+sdd[i]+"\">";
      }
    }

    return _returned;
  }

  //Listens for a new chat message
  socket.on('_new_message', function(data) {
    //Create message
    data._txt = data._txt + _addimages(data._txt);      
    io.emit('_message_send', data);

  });
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




