const Job = require('../models/jobs');
const geoCoder = require('../utils/geocoder');
const ErrorHandler = require('../utils/errorHandler');

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

// Get Single job => api/v1/jobs/:id
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.find({
      $and: [{ _id: req.params.id }, { slug: req.params.slug }],
    });

    if (!job || job.length === 0) {
      return next(new ErrorHandler('Job not found', 404));
    }

    res.status(200).json({
      success: true,
      data: job,
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

// Update a job => /api/v1/jobs/:id
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return next(new ErrorHandler('Job not found', 404));
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res
      .status(400)
      .json({ success: true, message: 'Job is updated', data: job });
  } catch (err) {
    console.log(err);
  }
};

// delete job => /api/v1/jobs/:id
exports.deleteJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res
        .status(400)
        .json({ success: false, message: 'Canot find job with that id' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: 'Job is deleted', data: null });
  } catch (err) {
    console.log(err);
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

// Get stats about a topic(job) => /api/v1/status/:topic
exports.jobStats = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      {
        $match: { $text: { $search: '"' + req.params.topic + '"' } },
      },
      {
        $group: {
          _id: { $toUpper: '$experience' },
          totalJobs: { $sum: 1 },
          avgPosition: { $avg: '$positions' },
          avgSalary: { $avg: '$salary' },
          minSalary: { $min: '$salary' },
          maxSalary: { $max: '$salary' },
        },
      },
    ]);

    if (stats.length === 0) {
      return next(
        new ErrorHandler(`No stats found for - ${req.params.topic}`, 200)
      );
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    console.log(err);
  }
};
