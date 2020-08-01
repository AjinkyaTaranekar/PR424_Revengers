const mongoose = require("mongoose");
const coordsShema = new mongoose.Schema({
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
   
  },
});
const FarmerReqSchema = new mongoose.Schema({
  requestId: String,
  name: String,
  contactDetails: {
    phoneno: Number,
    email: String,
    address: String,
  },
  locations: {
    origin: coordsShema,
    destination: coordsShema,
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
