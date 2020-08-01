const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  console.log(req.user._id);
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    res.status(422).send({ error: "You must provide name and location " });
  }

  try {
    console.log(req.user._id, "hi there");
    const track = new Track({ name, locations, userId: req.user._id });

    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
