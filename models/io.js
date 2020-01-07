// models/io.js
var ioCore = {};

/**
 * text save
 */
ioCore.init = function(io) {
  io.on('connection', function(socket) {
    console.log('IO socket is constructed.');

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

  });
};

module.exports = ioCore;