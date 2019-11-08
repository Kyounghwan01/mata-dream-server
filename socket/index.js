const { CONNECTION, MESSAGE, JOIN, LEAVE } = require('../constant/socketActionType');

module.exports = io => {
  io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });
  });
  // io.on(CONNECTION, socket => {
  //   console.log('user connected');
  //   socket.on(JOIN, ({ roomId }) => {
  //     console.log('CONNECTION');
  //     socket.join(roomId);
  //   });

  //   socket.on(MESSAGE, ({ roomId, userId, message }) => {
  //     io.to(roomId).emit(MESSAGE, { userId, message });
  //   });

  //   socket.on(LEAVE, roomId => {
  //     socket.leave(roomId);
  //   });
  // });
};


// io.on("connection", socket => {
//   console.log("a user connected :D");
//   socket.on("chat message", msg => {
//     console.log(msg);
//     io.emit("chat message", msg);
//   });
// });