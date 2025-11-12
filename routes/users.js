const router = require("express").Router();
const { updateUser } = require("../controllers/update");
const { getCurrentUser } = require("../controllers/users");



router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
