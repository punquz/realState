const router = require('express').Router();
const { protect } = require('../middleware/auth');

const {
  postCart,
  getCart,
  postOrder,
  getOrder,
  postRemoveCart
} = require('../controllers/userController');

router
  .route('/cart')
  .post(protect, postCart)
  .get(protect, getCart);

router.route('/cart-delete').post(protect, postRemoveCart);

router
  .route('/order')
  .post(protect, postOrder)
  .get(protect, getOrder);

module.exports = router;
