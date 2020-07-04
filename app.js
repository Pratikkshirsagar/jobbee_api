const express = require('express');
const app = express();

const dotenv = require('dotenv');

const conectDatabase = require('./config/db');
const errorMiddleware = require('./middleware/errors');
const ErrorHandler = require('./utils/errorHandler');

// Setting up config.env variables
dotenv.config({ path: './config/config.env' });

// handling Uncatch Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncatch exception.`);
  process.exit();
});

// connecting to db
conectDatabase();

// set up bodyparser
app.use(express.json());

// Importing all Routes
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');

app.use('/api/v1/jobs', jobs);
app.use('/api/v1/auth', auth);

// Handle unhandle routes
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});
// middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handling Unhandled Promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandler promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
