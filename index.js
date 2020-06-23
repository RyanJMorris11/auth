// main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // Middleware: parse any incomming request into JSON
const morgan = require('morgan'); // Middleware: logging framework
const app = express();
const router = require('./router');

// DB Setup
const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
// var dbUrl =  'mongodb://ChatbotAdmin:ChatbotAdmin@ds239177.mlab.com:39177/learning_node';
// var dbLocation = '/c/Users/ryanj/OneDrive/desktop/ReactCourse/advCourse/data/db';
// var mongodbExe =  '/c/Program Files/MongoDB/Server/4.2/bin/mongod.exe  ';
// mongoose.connect('mongodb://localhost:auth/auth'); // Name 'auth' is being declared here

const db = 'mongodb://127.0.0.1:27017/SUCCESS'; // Name: 'SUCCESS' is being declared here
mongoose
  .connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  })
  .then(() => {
    console.log('Connected To Mongo Db DataBase');
  })
  .catch((err) => {
    console.log('DataBase Connection Error ' + err);
  });

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);
