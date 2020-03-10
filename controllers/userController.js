const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const Planet = require('../models/Planet');
const User = require('../models/User');
const Order = require('../models/Order');

/* 
    @desc Add items to the cart
    @route POST /api/v1/users/cart
    @access Private
**/

exports.postCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const planet = await Planet.findById(productId);
  const result = req.user.addToCart(planet);
  const updatedCartUser = await User.findByIdAndUpdate(req.user.id, {
    $set: {
      cart: { ...result }
    }
  });
  res.status(201).json({ success: true, msg: 'added items to the cart' });
});

/* 
      @desc view items of the cart
      @route GET /api/v1/users/cart
      @access Private
  **/

exports.getCart = asyncHandler(async (req, res, next) => {
  const userCartItems = await req.user
    .populate('cart.items.productId')
    .execPopulate();
  res.status(200).json({ success: true, data: userCartItems.cart.items });
});

/* 
      @desc delete items of the cart
      @route POST /api/v1/users/cart
      @access Private

**/

/* @desc add/place order
      @route GET /api/v1/users/order
      @access Private
**/
exports.postOrder = asyncHandler(async (req, res, next) => {
  const data = await req.user.populate('cart.items.productId').execPopulate();
  if (!data) {
    return next(new ErrorResponse('No data in cart', 404));
  }
  let cartData = data.cart.items.map(el => {
    return { quantity: el.quantity, product: { ...el.productId._doc } };
  });
  let order = new Order({
    user: {
      name: req.user.name,
      userId: req.user.id
    },
    products: cartData
  });
  let result = await order.save();
  if (result) {
    let cart = { items: [] };
    let clearCart = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        cart: cart
      }
    });
  }
  res.status(201).json({ success: true, msg: 'order placed', result });
});
