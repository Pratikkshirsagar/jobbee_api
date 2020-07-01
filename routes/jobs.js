const express = require('express');
const router = express.Router();

// Importing job controller method
const { getJobs, createJob } = require('../controllers/jobsController');

router.route('/jobs').get(getJobs).post(createJob);

module.exports = router;
