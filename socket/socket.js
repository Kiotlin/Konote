var socket_io = require('socket.io');
var editorIO = require('../models/io');
var socketIO = {};

// Get io
socketIO.getSocketIO = function(server) {
    var io = socket_io.listen(server);
    // Start IO
    editorIO.init(io);
}

module.exports = socketIO;