const Status = require(`../const/Status`);

module.exports = (users, me) => {

  return users.map(u => {

    if (u.socketId === me.paired) {
      u.status = Status.PAIRED;
      u.paired = me.socketId;
    }

    return u;

  }); //door elk item gaan en voor elk item een specifiek actie doen

};
