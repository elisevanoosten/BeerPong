module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  let rooms = [];

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    socket.emit(`init`, socketId);

    socket.on(`joinRoom`, urlSocketId => {
      // room joinen
      socket.join(urlSocketId);
      socket.broadcast.to(urlSocketId).emit(`roomJoined`, urlSocketId);

      // dubbele rooms verwijderen
      rooms = rooms.filter(r => r !== urlSocketId);
      rooms.push(urlSocketId);

      // array van rooms tonen
      socket.emit(`newRooms`, rooms);
    });

    // socket.on(`startGame`, urlSocketId => {
    //   socket.broadcast.to(urlSocketId).emit(`startGameResponse`, urlSocketId);
    // });

    socket.on(`carMoved`, props => {
      socket.broadcast.to(props.urlSocketId).emit(`carMovedHow`, props.carX);
    });


    socket.on(`disconnect`, () => {
      const room = rooms.find(r => r === r);
      if (room) socket.broadcast.emit(`leave`, room);
      rooms = rooms.filter(r => r !== r);
      console.log(room, `left`);
    });


  });

  next();

};

module.exports.register.attributes = {
  name: `invloed`,
  version: `0.1.0`
};
