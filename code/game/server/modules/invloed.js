module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {
    socket.emit('init');

    socket.broadcast.emit('join');

    socket.on('room', to => {
      io.to(to).emit('room', socketId)
    })
  });

  next();

};

module.exports.register.attributes = {
  name: `invloed`,
  version: `0.1.0`
};
