const router = require("express").Router();
const { updateUser } = require("../controllers/update");
const auth = require("../middlewares/auth");
router.use(auth);
router.patch("/me", updateUser);
