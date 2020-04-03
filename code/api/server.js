const express = require('express');

const cors = require('cors');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const server = http.createServer(app);
const io = socketIo(server);

const todos = require('./routes/todos');
const todolist = require('./routes/todolist');
const login = require('./routes/login');
const signup = require('./routes/signup');
const user = require('./routes/user');
const leaderboard = require('./routes/leaderboard');
const tags = require('./routes/tags');
const auth = require('./middleware/auth');
const authorization = require('./middleware/authorization');
const logger = require('./middleware/logger');
// const errorHandler = require('./middleware/errorHandler');

app.use(logger);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/todo', auth.verifyToken, authorization.verifyUser, todos);
app.use('/leaderboard', leaderboard);
app.use('/todolist', auth.verifyToken, authorization.verifyUser, todolist);
app.use('/tag', auth.verifyToken, authorization.verifyUser, tags);
app.use('/user', auth.verifyToken, authorization.verifyUser, user);
app.use('/login', login);
app.use('/signup', signup);

// app.use(errorHandler);

// require('./database/relations');

// sequelize
//   .sync()
//   // .sync({ force: true })
//   .then(() =>
//     // app.listen(process.env.PORT || 9000, () => {
//     //   console.log(`listening on port ${process.env.PORT}`);
//     // })
//   )
//   .catch(err => {
//     console.log(err);
//   });

const PORT = process.env.NODE_ENV === 'test' ? 9001 : process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const getLeaderboard = async socket => {
  try {
    const res = await axios.get('http://localhost:9000/leaderboard');
    // console.log('emitting leaderboard', res);
    socket.emit('leaderboard', res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// // Socket server
// io.on('connection', socket => {
//   console.log('New client connected');
//   setInterval(() => getLeaderboard(socket), 5000);
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });

// server.listen(process.env.SOCKET_PORT, () =>
//   console.log(`Socket server listening on port ${process.env.SOCKET_PORT}`)
// );

// TODO When an event is completed, it will triggered a completed event, based on the priority and points it had, user will gain points
// TODO Add Levels for users(create a levels table with some predefined levels and points needed ) and associate each user to one
// TODO add cross-orogin CORS headers so only our frontend can access the api
// TODO Add FAKER library for seeding the db
// TODO Add migrations
// TODO Add validation for all frontend data https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk
// TODO Add support for profile avatars, cloudinary and cdm
// TODO Add confirmation email with Sendgrid or Mailgun

module.exports = app;
