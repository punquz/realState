const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const Planet = require('../models/Planet');
const User = require('../models/User');

/* 
    @desc Get All Planets
    @route GET /api/v1/planets
    @access public
**/
exports.getPlanets = asyncHandler(async (req, res, next) => {
  let { page, limit } = req.query;

  //Pagination
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Planet.countDocuments();

  const planets = await Planet.find()
    .skip(startIndex)
    .limit(limit);

  if (planets.length === 0)
    return res.status(200).json({ status: true, message: 'No data' });

  //Pagination prev and next
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    pagination,
    total: planets.length,
    msg: 'show all planets!',
    data: planets
  });
});

/* 
    @desc Get Single Planet
    @route GET /api/v1/planets/:id
    @access public
**/
exports.getPlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);
  if (!planet)
    return next(
      new ErrorResponse(`planet not found with id:${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Get planet ${req.params.id}`,
    data: planet
  });
});

/* 
    @desc Create New Planet
    @route POST /api/v1/bootcamps
    @access private
**/
exports.createPlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.create(req.body);
  res
    .status(201)
    .json({ success: true, data: planet, msg: 'Created new planet product!' });
});

/* 
    @desc Update Planet
    @route PUT /api/v1/bootcamps/:id
    @access private
**/
exports.updatePlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!planet)
    return next(
      new ErrorResponse(`Planet not found with id:${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Updated planet ${req.params.id}`,
    data: planet
  });
});

/* 
    @desc Delete Planet
    @route DELTE /api/v1/planets/:id
    @access private
**/
exports.deletePlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findByIdAndDelete(req.params.id);
  if (!planet)
    return next(
      new ErrorResponse(`Planet not found with id:${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Deleted planet ${req.params.id}`,
    data: {}
  });
});
