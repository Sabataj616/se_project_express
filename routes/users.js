const router = require("express").Router();
const { updateUser } = require("../controllers/update");
const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
