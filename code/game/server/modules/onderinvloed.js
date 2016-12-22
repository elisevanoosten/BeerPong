module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    socket.emit(`init`, socketId);

    socket.on(`joinRoom`, function(room) {
      users.push({username, socketId});
      socket.emit(`login`, users);

      socket.join(room);
      socket.broadcast.emit(`i'm joining, xoxo`, socketId);
      // socket.broadcast.to(room).emit('count', "Connected:" + " " + count);

    });

    // socket.on(`disconnect`, () => {
    //   const user = users.find(u => u.socketId === socketId);
    //   if(user) socket.broadcast.emit(`leave`, user.username);
    //   users = users.filter(u => u.socketId !== socketId);
    // });

  });

  next();

};

module.exports.register.attributes = {
  name: `invloed`,
  version: `0.1.0`
};
