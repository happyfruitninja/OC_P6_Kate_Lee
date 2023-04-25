const sauce = require("../models/sauce");
const Sauce = require("../models/sauce");

//exporting multiple sauces from one file
exports.createSauce = (req, res, next) => {
  //FIXME parse req.body into a new variable called parsedSauce (then req.body becomes parsedSauce below)
  const sauce = new Sauce({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    heat: req.body.heat,
    likes: 0,
    dislikes: 0,
    imageUrl: "",
    mainPepper: req.body.mainPepper,
    usersLiked: [],
    usersDisliked: [],
    userId: req.body.userId,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce saved successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//getting a list of sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//getting a single sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

//update/modify sauces
exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    imageUrl: req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
    userId: req.body.userId,
  });
  Sauce.updateOne({
    _id: req / params.id,
  })
    .then((sauces) => {
      res.status(201).json(sauces);
      message: "Sauce updated successfully";
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

//deleting sauces - 1. it checks IF requested id exists, 2.see IF the userId matches the userId of the connected user, 3. DELETE the sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne(
    { _id: req.params.id }.then((thing) => {
      if (!sauce) {
        return res.status(404).json({ error: new Error("No such sauce") });
      }
      if (sauce.userId !== req.auth.userId) {
        return res
          .status(400)
          .json({ error: new Error("Unauthorized request") });
      }
      Sauce.deleteOne({
        _id: req.params.id,
      })
        .then((e) => {
          res.status(200).json();
          message: "Deleted";
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    })
  );
};
