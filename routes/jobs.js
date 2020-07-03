const express = require('express');
const router = express.Router();

// Importing job controller method
const {
  getJobs,
  getJob,
  createJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
} = require('../controllers/jobsController');
const { get } = require('mongoose');

router.route('/jobs').get(getJobs).post(createJob);

router.route('/jobs/:id').put(updateJob).delete(deleteJob);

router.route('/jobs/:id/:slug').get(getJob);

router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);

module.exports = router;
