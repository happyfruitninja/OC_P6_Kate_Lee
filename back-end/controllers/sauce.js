const Thing = require("../models/thing");

//exporting multiple things from one file
exports.createThing = (req, res, next) => {
    const thing = new Thing({
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
    thing
      .save()
      .then(() => {
        res.status(201).json({
          message: "Post saved successfully",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };

  //getting a list of things
  exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then((things) => {
        res.status(200).json(things);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }

  //getting a single thing
  exports.getOneThing = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id,
    })
      .then((thing) => {
        res.status(200).json(thing);
      })
      .catch((error) => {
        res.status(404).json({ error: error });
      });
  }

  //update/modify things
  exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
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
    Thing.updateOne({
      _id: req / params.id,
    })
      .then((things) => {
        res.status(201).json(things);
        message: "Thing updated successfully";
      })
      .catch((error) => {
        res.status(404).json({ error: error });
      });
  }

  //deleting things
  exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({
      _id: req.params.id,
    })
      .then((e) => {
        res.status(200).json();
        message: "Deleted";
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }