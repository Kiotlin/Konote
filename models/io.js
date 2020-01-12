// models/io.js
var Memo = require('./memo');
var ioCore = {};

/**
 * text save
 */
ioCore.init = function (io) {
  io.on('connection', function (socket) {
    console.log('IO socket is constructed.');

    /**
     * save button socket
     */
    socket.on('save', function (msg) {
      Memo.findOne({ title: msg.title }, function (err, memo) {
        var newMemo = {
          username: msg.username,
          title: msg.title,
          author: msg.author,
          content: msg.content
        };

        if (err) { return err; }

        if (memo) {
          // if already exists, update it
          Memo.update({ title: msg.title }, newMemo, function (err) {
            if (err) {
              console.log(err);
            } else {
              socket.emit('saveSuccess');
              console.log('Update Success.');
            }
          });
          return true;
        }

        Memo.create(newMemo, function (err, newMemo) {
          if (err) return console.log(err);
          console.log('success' + newMemo);
        });

        socket.emit('saveSuccess');

      });

    });

    /**
     * real-time saving socket
     */
    socket.on('newChange', function (nc) {
      Memo.findOne({ title: nc.title }, function (err, memo) {
        if (err) {
          console.log(err);
        } 

        if (memo) {
          Memo.updateOne({ title: nc.title }, nc, function (err) {
            if (err) {
              console.log(err);
            } else {
              socket.emit('saveSuccess');
              console.log('New change on memo: \'' + nc.title + '\'');
            }
          });
        } else {
          Memo.create(nc, function (err, nc) {
            if (err) return console.log(err);
            console.log('success' + nc);
          });
        }

      });
    });

    /**
     * disconnect socket
     */
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

  });
};

module.exports = ioCore;