module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);
  const Status = require(`./const/Status`);
  const search = require(`./lib/search`);
  const linkStranger = require(`./lib/linkStranger`);
  const cleanPaired = require(`./lib/cleanPaired`);

  let users = [];

  io.on(`connection`, socket => {

    const {id: socketId} = socket; //hernoemen naar socketId

    const me = {
      status: Status.SEARCHING,
      socketId
    };

    console.log(socketId);

    users.push(me);

    socket.on('Room', data =>{
      socket.emit(`publicMsg`, data)
    });
    // console.log(socketId);
    // socket.on(`search`, () => {
    //
    //   const stranger = search(users, me);
    //
    //   if (stranger) {
    //     me.status = Status.PAIRED;
    //     me.paired = stranger.socketId;
    //     users = linkStranger(users, me);
    //
    //     socket.emit(`found`, stranger.socketId);
    //   }
    //
    //   console.log(users);
    //
    // });

    socket.on(`elise`, () => {
      console.log(`hey eliseke`);
    });

    socket.on(`room`, room1 => {
      io.to(`devine`).emit(`nog mee?`);
      io.to(room1).emit(`room`, socketId);
    });

    socket.on(`disconnect`, () => {
      users = users.filter(c => c.socketId !== socketId);
      users = cleanPaired(users, me);
    });

  });

  next();

};

module.exports.register.attributes = {
  name: `devineroulette`,
  version: `0.1.0`
};
