require(`dotenv`).load({silent: true});

const {PORT} = process.env;

const express = require(`express`);
const app = express();

const ExpressPeerServer = require(`peer`).ExpressPeerServer;
const peer = app.listen(PORT);

app.use(`/api`, ExpressPeerServer(peer));

console.log(`PEER running at port ${PORT}`);
