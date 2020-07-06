const User = require('../models/users');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Register a new user => /api/v1/auth/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role: role,
  });

  // create jwt token
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    message: 'User is register',
    token: token,
  });
});

// Login user  => /api/v1/auth/login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & passowrd
  if (!email || !password) {
    return next(new ErrorHandler('Please provide an email and passoword', 400));
  }

  // Check for yser
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token: token,
  });
});
