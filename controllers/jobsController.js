const Job = require('../models/jobs');

// Get all jobs => /api/v1/jobs
exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (err) {
    console.log(err);
  }
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
