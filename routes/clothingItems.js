const router = require("express").Router();
const {
  getItems,
  postItems,
  deleteItems,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
router.get("/items", getItems);
router.use(auth);
router.delete("/items/:itemId", deleteItems);
router.post("/items", postItems);
router.put("/items/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", unlikeItem);

module.exports = router;
