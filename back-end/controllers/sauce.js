const sauce = require("../models/sauce");
const Sauce = require("../models/sauce");

//exporting multiple sauces from one file
exports.createSauce = (req, res, next) => {
  //FIXME parse req.body into a new variable called parsedSauce (then req.body becomes parsedSauce below)
  const url = req.protocol + "://" + req.get("host");
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    imageUrl: url + "/images/" + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    usersLiked: [],
    usersDisliked: [],
    userId: req.body.sauce.userId,
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
//without step 1 & 2 - Because the front end doesn't send a user ID when requesting to delete. Therefore, you cannot check if the user making the request is the owner of the thing they are trying to delete. This means that anyone with a valid token could delete anyone's thing.
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
