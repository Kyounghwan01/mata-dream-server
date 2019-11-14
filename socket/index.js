const { CONNECTION, MESSAGE, JOIN, LEAVE, ACCEPT } = require('../constant/socketActionType');

module.exports = io => {

  io.on(CONNECTION, socket => {

    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });

    socket.on(JOIN, ({ roomId }) => {
      console.log('CONNECTION');
      socket.join(roomId);
    });

    socket.on('PREVENT_ENTER', ({status, dataId})=>{
      io.emit('ENTER_SOMEONE', dataId);
    })

    socket.on('sendMessage', ({message, roomId, userId}) => {
      io.sockets.in(roomId).emit('receiveMessage', [message, userId]);
    })

    socket.on('sendAlert', ({userId, roomId}) =>{
      //io.to(roomId).emit('receiveAlert', userId)
      socket.to(roomId).broadcast.emit('receiveAlert', userId); // 나를 제외한 그룹 전체
    })

    socket.on('sendAccept', ({userId, roomId}) => {
      socket.to(roomId).broadcast.emit('receiveAccept', userId);
    });

    socket.on('CANCEL', ({roomId}) => {
      socket.to(roomId).broadcast.emit('CANCEL_EVENT');
    })

    socket.on(MESSAGE, ({ roomId, userId, message }) => {
      io.to(roomId).emit(MESSAGE, { userId, message });
    });

    socket.on('LEAVE', roomId => {
      socket.leave(roomId);
    });

  });
};
