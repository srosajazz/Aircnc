const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');


const app = express();
const server = http.Server(app);
const io = socketio(server);



  // setTimeout(() => {
  //   socket.emit('hello', 'World');
  // }, 4000);

  // Get data from server
  // socket.on('Sergio', data => {
  //   console.log(data);
  // })



mongoose.connect('mongodb+srv://Aircncdb:sergio@aircnc-jczki.mongodb.net/Aircnc?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
  // console.log(socket.handshake.query);
  // console.log('User connected', socket.id);

  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});


//middlewares
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});


//GET , POST, PUT, DELETE

// requ.query = access query params ( for filters)
// requ.params = access route params ( for edit, delete)
// requ.body = access body of the requisiton ( for edit and create)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3334);
