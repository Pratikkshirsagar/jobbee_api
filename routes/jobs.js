const express = require('express');
const router = express.Router();

// Importing job controller method
const {
  getJobs,
  createJob,
  getJobsInRadius,
} = require('../controllers/jobsController');

router.route('/jobs').get(getJobs).post(createJob);

router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);

module.exports = router;
