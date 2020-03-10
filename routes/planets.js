const router = require("express").Router();
const { protect } = require("../middleware/auth");
const {
  getPlanets,
  getPlanet,
  createPlanet,
  updatePlanet,
  deletePlanet,
  postCart,
  getCart
} = require("../controllers/planetController");

router
  .route("/")
  .get(getPlanets)
  .post(protect, createPlanet);
router
  .route("/:id")
  .get(getPlanet)
  .put(updatePlanet)
  .delete(deletePlanet);

router
  .route("/cart")
  .post(protect, postCart)
  .get(protect, getCart);

//export the router
module.exports = router;
