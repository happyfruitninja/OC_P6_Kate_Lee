const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//will check any field that has "unique" set to true and validates info before saving to the database. Make sure to import first
userSchema.plugin(uniqueValidator);

//create model
module.exports = mongoose.model("User", userSchema);
