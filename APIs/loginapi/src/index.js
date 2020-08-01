require("./models/User");
require("./models/UserProfile");
require("./models/Track");
require("./models/FarmerReq");
const requireAuth = require("./middlewares/requireAuth");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const trackRoutes = require("./routes/trackRoutes");
const authRoutes = require("./routes/authRoutes");
const farmerReqRoutes = require("./routes/farmerReqRoutes");
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(farmerReqRoutes);
app.use(trackRoutes);

// - ---------------------MongoDB Connection code  Start here--------------------------------
const mongoUri =
  "mongodb+srv://asbaghel:----@cluster0-prezq.mongodb.net/db94?retryWrites=true&w=majority"; //changed
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting", err);
});

// -------------------------- MongoDB Connection code ends here ------------------------------------

app.get("/", requireAuth, (req, res) => {
  res.send(`Your phoneno ${req.user.phoneno}`);
});

const PORT = (port = process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`listening on node ${PORT} `);
});
