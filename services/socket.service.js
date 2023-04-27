///<reference path="../index.js"/>

app.service('socketService', function () {
//   console.log('socket service called');

  var socket = null;
  socket = io('http://localhost:5000/');

  socket.on('newOrder', (data) => {
    // console.log(data);
  });

  this.getSocketInstance = function () {
    if (socket != null) {
      return socket;
    }
  };
});
