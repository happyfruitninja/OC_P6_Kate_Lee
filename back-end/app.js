const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const sauceRoutes = require('./routes/sauce'); //import sauceRoutes

const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v9wwnqa.mongodb.net/hot_takes`
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

app.use("/api/sauce", sauceRoutes);
app.use("/api/auth", userRoutes);
module.exports = app;
