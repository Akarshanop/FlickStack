
const router = require("express").Router();

router.use("/movies", require("./movieRoutes"));
router.use("/actors", require("./actorRoutes"));

module.exports = router;
