const mongoose = require("mongoose");

const FarmerReqSchema = new mongoose.Schema({
  name: String,
  contactDetails: {
    phoneno: Number,
    email: String,
    address: String,
  },
  locations: {
    origin: {
      latitude: Number,
      longitude: Number,
      altitude: Number,
    },
    destination: {
      latitude: Number,
      longitude: Number,
      altitude: Number,
    },
  },
  shippingDetails: {
    grainType: String,
    dateOfDelivery: String,
    weight: Number,
    mode: String,
  },
  reqActive: Boolean,
});

mongoose.model("FarmerReq", FarmerReqSchema);
