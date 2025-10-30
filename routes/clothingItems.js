const router = require("express").Router();
const { getItems, postItems, deleteItems, likeItem, unlikeItem } = require("../controllers/clothingItems");

router.get("/items", getItems);
router.delete("/items/:itemId", deleteItems);
router.post("/items", postItems);
router.put("/items/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", unlikeItem);

module.exports = router;
