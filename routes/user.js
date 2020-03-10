const router = require('express').Router();
const { protect } = require('../middleware/auth');

const {
  postCart,
  getCart,
  postOrder
} = require('../controllers/userController');

router
  .route('/cart')
  .post(protect, postCart)
  .get(protect, getCart);

router.route('/order').post(protect, postOrder);

module.exports = router;
