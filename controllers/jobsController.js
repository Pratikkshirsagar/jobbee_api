const Job = require('../models/jobs');
const geoCoder = require('../utils/geocoder');

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

// Search job within radius => /api/v1/jobs/:zipcode/:distance
exports.getJobsInRadius = async (req, res, next) => {
  try {
    const { zipcode, distance } = req.params;

    // getting latitude and longitude from geocoder with zipcode
    const loc = await geoCoder.geocode(zipcode);
    const latitude = loc[0].latitude;
    const longitude = loc[0].longitude;

    const radius = distance / 3963;

    const jobs = await Job.find({
      location: {
        $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
      },
    });

    res.status(200).json({
      success: true,
      results: jobs.length,
      data: jobs,
    });
  } catch (err) {
    console.log(err);
  }
};
