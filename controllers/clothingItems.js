const clothingItemModel = require("../models/clothingItem");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");

module.exports.getItems = (req, res, next) => {
  clothingItemModel
    .find({})
    .then((clothingItem) => {
      res.send({ data: clothingItem });
    })
    .catch(next);
};
module.exports.postItems = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItemModel
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      } if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed to methods"));
      } 
        return next(err);
      
    });
};

module.exports.deleteItems = (req, res, next) => {
  clothingItemModel
    .findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((clothingItem) => {
      if (clothingItem.owner.toString() === req.user._id.toString()) {
        return clothingItemModel
          .deleteOne({ _id: req.params.itemId })
          .then((clothingInfo) => res.send({ data: clothingInfo }));
      }
      throw new ForbiddenError("You do not have authorization");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      } 
        return next(err);
      
    });
};

module.exports.likeItem = (req, res, next) => {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      } if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

module.exports.unlikeItem = (req, res, next) => {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};
