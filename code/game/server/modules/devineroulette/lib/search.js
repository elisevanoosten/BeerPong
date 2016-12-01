const Status = require(`../const/Status`);

module.exports = (users, me) => {

  const strangers = users.filter(u => { //searching stranger that's not me
    return u.socketId !== me.socketId && u.status === Status.SEARCHING;
  });

  if (strangers.length > 0) { //random stranger
    return strangers[Math.floor(Math.random() * strangers.length)];
  } else {
    return false;
  }

};
