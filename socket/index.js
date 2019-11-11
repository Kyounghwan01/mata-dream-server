const { CONNECTION, MESSAGE, JOIN, LEAVE, ACCEPT } = require('../constant/socketActionType');

module.exports = io => {

  io.on(CONNECTION, socket => {

    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });

    //위까지 예제

    socket.on(JOIN, ({ roomId }) => {
      console.log('CONNECTION');
      socket.join(roomId);
    });

    socket.on('sendMessage', ({message, roomId}) => {
      io.sockets.in(roomId).emit('receiveMessage', message);
    })

    socket.on(MESSAGE, ({ roomId, userId, message }) => {
      io.to(roomId).emit(MESSAGE, { userId, message });
    });

    socket.on(LEAVE, roomId => {
      socket.leave(roomId);
    });


  });
};



// io.on("connection", socket => {
  // console.log("a user connected :D");
  // socket.on("chat message", msg => {
  //   console.log(msg);
  //   io.emit("chat message", msg);
  // });
// });