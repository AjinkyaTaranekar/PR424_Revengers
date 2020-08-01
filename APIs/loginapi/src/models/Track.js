const mongoose = require("mongoose");
const pointSchema = new mongoose.Schema({
  timeStamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});
const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  locations: [pointSchema],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Track", trackSchema);
