const router = require("express").Router();
const {
  getItems,
  postItems,
  deleteItems,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.get("/items", getItems);
router.use(auth);
router.delete("/items/:itemId", validateItemId, deleteItems);
router.post("/items", validateCardBody, postItems);
router.put("/items/:itemId/likes", validateItemId, likeItem);
router.delete("/items/:itemId/likes", validateItemId, unlikeItem);

module.exports = router;
