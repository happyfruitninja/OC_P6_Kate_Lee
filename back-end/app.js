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
  thing.save().then(
    () => {
     res.status(201).json({
        message: "Post saved successfully",
      })
    }
  ).catch(
    (error) => {
     rew.status(400).json({
      error: error
    });
   }
  );
});

app.get("/api/sauces", (req, res, next) => {
  const sauces = [
    {
      _id: "0000",
      name: "sauce_0000",
      manufacturer: "maker_0000",
      description: "description_0000",
      heat: 0,
      likes: 0,
      dislikes: 0,
      imageUrl: "string",
      mainPepper: "string",
      usersLiked: "string[]",
      usersDisliked: "string[]",
      userId: "string",
    },
    {
      _id: "1111",
      name: "sauce_1111",
      manufacturer: "maker_1111",
      description: "description_1111",
      heat: 1,
      likes: 1,
      dislikes: 1,
      imageUrl: "string",
      mainPepper: "string",
      usersLiked: "string[]",
      usersDisliked: "string[]",
      userId: "string",
    },
  ];
  res.status(200).json(sauces);
});

app.use("/api/auth", userRoutes);
module.exports = app;
