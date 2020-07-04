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

router.route('/').get(getJobs).post(createJob);

router.route('/:id').put(updateJob).delete(deleteJob);

router.route('/:id/:slug').get(getJob);

router.route('/:zipcode/:distance').get(getJobsInRadius);

module.exports = router;
