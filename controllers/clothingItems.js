const clothingItemModel = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");
const auth = require("../middlewares/auth");

module.exports.getItems = (req, res) => {
  clothingItemModel
    .find({})
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.postItems = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItemModel
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Item ID" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data passed to methods" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.deleteItems = (req, res) => {
  clothingItemModel
    .findById(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item not found");

      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((clothingItem) => {
      console.log("Check");
      if (clothingItem.owner.toString() === req.user._id.toString()) {
        return clothingItemModel
          .deleteOne({ _id: req.params.itemId })

          .then((clothingItem) => res.send({ data: clothingItem }))
          .catch((err) => {
            console.error(err);
            if (err.name === "CastError") {
              return res
                .status(BAD_REQUEST)
                .send({ message: "Invalid Item ID" });
            }
            if (err.name === "DocumentNotFoundError") {
              return res.status(NOT_FOUND).send({ message: "Item not found" });
            }
            return res
              .status(INTERNAL_SERVER_ERROR)
              .send({ message: "An error has occurred on the server" });
          });
      }
      return res.status(403).send({ message: "You dont have authorization" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Item ID" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.likeItem = (req, res) => {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.unlikeItem = (req, res) => {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};
