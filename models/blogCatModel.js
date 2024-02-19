const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var testimonySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: {},
      required: true,
    },
    testimony: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Testimony", testimonySchema);
