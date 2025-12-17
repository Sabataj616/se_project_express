const router = require("express").Router();
const cors = require("cors");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserSignUpBody,
  validateUserSignInBody,
} = require("../middlewares/validation");

router.use(cors());
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
router.post("/signin", validateUserSignInBody, login);
router.post("/signup", validateUserSignUpBody, createUser);
router.use("/", clothingItemsRouter);
router.use(auth);
router.use("/users", userRouter);

router.use((req, res) =>
  res.status(NOT_FOUND).send({ message: "Requested resource not found" })
);
module.exports = router;
