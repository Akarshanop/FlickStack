// Backend/routes/movieRoutes.js
const router = require("express").Router();
const ctrl = require("../controllers/movieController");

router.get("/", ctrl.getAllMovies);
router.post("/", ctrl.createMovie);
router.put("/:id", ctrl.updateMovie);
router.delete("/:id", ctrl.deleteMovie);

module.exports = router;
