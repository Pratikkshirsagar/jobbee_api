const express = require('express');
const app = express();

const dotenv = require('dotenv');

const conectDatabase = require('./config/db');

// Setting up config.env variables
dotenv.config({ path: './config/config.env' });

// connecting to db
conectDatabase();

const middelware = (req, res, next) => {
  console.log('Hello from middleware');
  req.user = 'Pratik Kshirsagar';
  next();
};

app.use(middelware);

// Importing all Routes
const jobs = require('./routes/jobs');

app.use('/api/v1', jobs);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} in ${process.env.NODE_ENV} mode`);
});
