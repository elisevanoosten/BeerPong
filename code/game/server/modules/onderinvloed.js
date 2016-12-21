module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    socket.emit(`init`, socketId);

    // socket.on(`subscribe`, function(room) {
    //   console.log(`joining room`, room);
    //   socket.join(room);
    // });

  });

  next();

};

module.exports.register.attributes = {
  name: `invloed`,
  version: `0.1.0`
};
