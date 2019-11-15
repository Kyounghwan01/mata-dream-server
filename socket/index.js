const {
  CONNECTION,
  MESSAGE,
  JOIN,
} = require("../constant/socketActionType");

module.exports = io => {
  io.on(CONNECTION, socket => {
    socket.on("chat message", msg => {
      io.emit("chat message", msg);
    });

    socket.on(JOIN, ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("PREVENT_ENTER", ({ status, dataId }) => {
      io.emit("ENTER_SOMEONE", dataId);
    });

    socket.on("sendMessage", ({ message, roomId, userId }) => {
      io.sockets.in(roomId).emit("receiveMessage", [message, userId]);
    });

    socket.on("sendAlert", ({ userId, roomId }) => {
      socket.to(roomId).broadcast.emit("receiveAlert", userId);
    });

    socket.on("sendAccept", ({ userId, roomId }) => {
      socket.to(roomId).broadcast.emit("receiveAccept", userId);
    });

    socket.on("CANCEL", ({ roomId }) => {
      socket.to(roomId).broadcast.emit("CANCEL_EVENT");
    });

    socket.on(MESSAGE, ({ roomId, userId, message }) => {
      io.to(roomId).emit(MESSAGE, { userId, message });
    });

    socket.on("LEAVE", roomId => {
      socket.leave(roomId);
    });

    socket.on("HOSTOUT", roomId => {
      io.to(roomId.roomId).emit("HOSTOUT_YOUOUT");
    });
  });
};
