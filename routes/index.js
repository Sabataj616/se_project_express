const router = require("express").Router();
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const cors = require("cors");

router.use(cors());
router.post("/signin", login);
router.post("/signup", createUser);
router.use(auth);
router.use("/users", userRouter);
router.use("/", clothingItemsRouter);

router.use((req, res) =>
  res.status(NOT_FOUND).send({ message: "Requested resource not found" })
);
module.exports = router;
