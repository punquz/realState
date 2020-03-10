const router = require('express').Router();
const { protect } = require('../middleware/auth');
const {
  getPlanets,
  getPlanet,
  createPlanet,
  updatePlanet,
  deletePlanet
} = require('../controllers/planetController');

router
  .route('/')
  .get(getPlanets)
  .post(protect, createPlanet);
router
  .route('/:id')
  .get(getPlanet)
  .put(updatePlanet)
  .delete(deletePlanet);

//export the router
module.exports = router;
