// Backend/routes/actorRoutes.js
const router = require("express").Router();
const ctrl = require("../controllers/actorController");

router.get("/", ctrl.getAllActors);
router.post("/", ctrl.createActor);
router.put("/:id", ctrl.updateActor);
router.delete("/:id", ctrl.deleteActor);

module.exports = router;
