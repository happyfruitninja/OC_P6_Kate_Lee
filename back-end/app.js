const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const Thing = require("./models/thing");

const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v9wwnqa.mongodb.net/test`
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas.");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas.");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//app.use(bodyParser.json());

app.post("/api/sauces", (req, res, next) => {
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
});

//getting a specific thing
app.get('/app/sauces/:id', (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then((thing) => {
    res.status(200).json(thing);
  }).catch((error) => {
    res.status(404).json({error: error});
  });
})


//getting a list of things
app.use("/api/sauces", (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({error: error});
    });
});

app.use("/api/auth", userRoutes);
module.exports = app;
