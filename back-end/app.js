const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user');

const app = express();

mongoose
  .connect(
    "mongodb+srv://happyfruitninja:OW6ECF67AzQhl8sr@cluster0.v9wwnqa.mongodb.net/test"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas.");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas.");
    console.error(error);
  });

app.use("/api/sauces", (req, res, next) => {
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


app.use('/api/auth', userRoutes);
module.exports = app;
