module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    socket.emit(`init`, socketId);

    socket.on(`subscribe`, function(room) {
      console.log(`joining room`, room);
      socket.join(room);
    });

    // socket.on(`send message`, function(data) {
    //   console.log(`sending room post`, data.room);
    //   socket.broadcast.to(data.room).emit(`conversation private post`, {
    //     message: data.message
    //   });
    // });


  });

  next();

};

module.exports.register.attributes = {
  name: `invloed`,
  version: `0.1.0`
};
