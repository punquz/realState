const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlanetSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name cannot be more than 50 charater"]
  },
  description: {
    type: String,
    required: [true, "Please add description"],
    maxlength: [500, "Description cannot be more than 500 charater"]
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"]
  },
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Planet", PlanetSchema);
