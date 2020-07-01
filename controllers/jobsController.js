const Job = require('../models/jobs');

// Get all jobs => /api/v1/jobs
exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
    message: 'This route will display all jobs',
  });
};

// Create all jobs => /api/v1/jobs
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);

    res.status(200).json({
      success: true,
      message: 'Job created.',
      data: job,
    });
  } catch (error) {
    console.log(error);
  }
};
