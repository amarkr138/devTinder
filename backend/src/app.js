const express = require('express');
const connectDB = require('./config/database');

const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requireRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors')

require('dotenv').config();

// const jwt = require('jsonwebtoken');
const app = express();

app.use(cors({
  origin : process.env.CLIENT_URL,
  credentials : true,
}))
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requireRouter);
app.use("/",userRouter)

connectDB()
  .then(() => {
    console.log('Database is connected successfully...');
    app.listen(process.env.PORT, () => {
      console.log('Server is successfully listening on port 7777...');
    });
  })
  .catch((err) => {
    console.error('Database cannot be connected');
  });
