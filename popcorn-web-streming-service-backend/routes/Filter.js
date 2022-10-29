const express = require("express");
const getuser = require("../middleware/getuser");
const LikedItems = require("../models/LikedItems");
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
router.post("/getlikes/:slug", async (req, res) => {
  try {
    if (!req.params.slug) {
      return res.status(404).json({ msg: "Slug not found" });
    }
    const movie = await Movies.findOne({ slug: req.params.slug });
    if (movie) {
      const movie_likes = movie.likes;
      return res.json({ likes: movie_likes });
    } else {
      const webseries = await Webseries.findOne({ slug: req.params.slug });
      if (!webseries) {
        return res.status(404).send("Movie not found");
      }
      const webseries_likes = webseries.likes;
      return res.json({ likes: webseries_likes });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/checklike/:id", getuser, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const likedItem = await LikedItems.findOne({
      liked_by: user._id,
      item_id: req.params.id,
    });
    if (likedItem) {
      return res.json({ liked: true });
    } else {
      return res.json({ liked: false });
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/addlike/:id", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    if (!req.params.id) {
      return res.status(400).send("Please enter movie id");
    }
    const movie = await Movies.findById(req.params.id);
    console.log(true)
    if (movie) {
      const prevItem = await LikedItems.findOne({
        item_id: movie._id,
        liked_by: user._id,
      });
      if (prevItem) {
        await LikedItems.deleteOne({ item_id: movie._id, liked_by: user._id });
        movie instanceof Movies;
        movie.likes = movie.likes - 1;
        movie.save();
        return res.json({ msg: "Like Removed" });
      }
      movie instanceof Movies;
      movie.likes = movie.likes + 1;
      movie.save();
      const newItem = await LikedItems.create({
        item_id: movie._id,
        liked_by: user._id,
      });
      newItem.save();
      res.json({ liked: true });
    } else {
      console.log(true);
      const webseries = await Webseries.findById(req.params.id);
      if (!webseries) {
        return res.status(404).send("Movie not found");
      }
      const prevItem = await LikedItems.findOne({
        item_id: webseries._id,
        liked_by: user._id,
      });
      if (prevItem) {
        await LikedItems.deleteOne({
          item_id: webseries._id,
          liked_by: user._id,
        });
        webseries instanceof Webseries;
        webseries.likes = webseries.likes - 1;
        webseries.save();
        return res.json({ msg: "Like Removed" });
      }
      webseries instanceof Webseries;
      webseries.likes = webseries.likes + 1;
      webseries.save();
      const newItem = await LikedItems.create({
        item_id: webseries._id,
        liked_by: user._id,
      });
      newItem.save();
      res.json({ liked: true });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
