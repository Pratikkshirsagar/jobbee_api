// Get all jobs => /api/v1/jobs
exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
    message: 'This route will display all jobs',
  });
};
