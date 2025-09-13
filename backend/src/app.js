require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');

const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requireRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');
const paymentRouter = require('./routes/payment');
const chatRouter = require('./routes/chat')
const http = require('http');
const initialiseSocket = require('./utils/socket');

// const jwt = require('jsonwebtoken');
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requireRouter);
app.use('/', userRouter);
app.use('/', paymentRouter);
app.use('/', chatRouter);


const server = http.createServer(app);
initialiseSocket(server);
connectDB()
  .then(() => {
    console.log('Database is connected successfully...');
    server.listen(process.env.PORT, () => {
      console.log('Server is successfully listening on port 7777...');
    });
  })
  .catch((err) => {
    console.error('Database cannot be connected');
  });
