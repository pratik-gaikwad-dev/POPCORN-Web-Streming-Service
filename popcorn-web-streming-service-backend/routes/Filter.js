const express = require("express");
const getuser = require("../middleware/getuser");
const Movies = require("../models/MoviesSchema");
const User = require("../models/UserSchema");
const Webseries = require("../models/WebSeriesSchema");
const app = express();
const router = express.Router();

router.post("/getitems/:genre", async (req, res) => {
  try {
    if (req.params.genre === "movies") {
      Movies.find({}, {}, (err, movies) => {
        if (!err) {
          res.send(movies);
        } else {
          res.send(err);
        }
      }).sort({ _id: -1 });
    }
    if (req.params.genre === "tv-series") {
      Webseries.find({}, {}, (err, movies) => {
        if (!err) {
          res.send(movies);
        } else {
          res.send(err);
        }
      }).sort({ _id: -1 });
    }
    if (
      req.params.genre !== "movies" &&
      req.params.genre !== "tv-series" &&
      req.params.genre !== "hollywood" &&
      req.params.genre !== "bollywood"
    ) {
      Movies.find(
        { genre: { $regex: req.params.genre, $options: "i" } },
        (err, docs) => {
          res.send(docs);
        }
      );
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/search/:query", async (req, res) => {
  try {
    if (!req.params.query) {
      return res.json({ msg: `Search value should not be empty` });
    }
    let result = await Movies.findOne({
      tags: { $regex: req.params.query, $options: "i" },
    });
    if (!result) {
      result = await Webseries.findOne({
        tags: { $regex: req.params.query, $options: "i" },
      });
    }
    if (!result) {
      return res.json({
        msg: `Search result for "${req.params.query}" not found`,
      });
    }
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
