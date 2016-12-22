module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    socket.emit(`init`, socketId);

    socket.on(`joinRoom`, function(room) {
      console.log(`joining room`, room);
      socket.join(room);
      socket.broadcast.emit(`i'm joining, xoxo`, socketId);
      // socket.broadcast.to(room).emit('count', "Connected:" + " " + count);

    });

  });

  next();

};

module.exports.register.attributes = {
  name: `invloed`,
  version: `0.1.0`
};
