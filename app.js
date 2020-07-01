const express = require('express');
const app = express();

const dotenv = require('dotenv');

// Setting up config.env variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
