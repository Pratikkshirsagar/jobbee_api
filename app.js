const express = require('express');
const app = express();

const dotenv = require('dotenv');

const conectDatabase = require('./config/db');
const errorMiddleware = require('./middleware/errors');
// Setting up config.env variables
dotenv.config({ path: './config/config.env' });

// connecting to db
conectDatabase();

// set up bodyparser
app.use(express.json());

const middelware = (req, res, next) => {
  console.log('Hello from middleware');
  req.user = 'Pratik Kshirsagar';
  next();
};

app.use(middelware);

// Importing all Routes
const jobs = require('./routes/jobs');

app.use('/api/v1', jobs);

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
