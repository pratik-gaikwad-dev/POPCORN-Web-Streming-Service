const express = require("express");
const Movies = require("../models/MoviesSchema");
const app = express();
const router = express.Router();

router.post("/uploadmovie", (req, res) => {
  try {
    if (req.body.name === null) {
      return res.status(400).json({ msg: "Name should not be empty" });
    }
    if (req.body.image === null) {
      return res.status(400).json({ msg: "Image path should not be empty" });
    }
    if (req.body.video === null) {
      return res.status(400).json({ msg: "Video path should not be empty" });
    }
    if (req.body.genre === null) {
      return res.status(400).json({ msg: "Genre should not be empty" });
    }
    if (req.body.year === null) {
      return res.status(400).json({ msg: "Year should not be empty" });
    }
    if (req.body.description === null) {
      return res.status(400).json({ msg: "Description should not be empty" });
    }
    if (req.body.tags === null) {
      return res.status(400).json({ msg: "tags should not be empty" });
    }
    if (req.body.slug === null) {
      return res.status(400).json({ msg: "slug should not be empty" });
    }
    const movie = new Movies({
      name: req.body.name,
      image: req.body.image,
      video: req.body.video,
      genre: req.body.genre,
      year: req.body.year,
      description: req.body.description,
      tags: req.body.tags,
      industry: req.body.industry,
      slug: req.body.slug,
    });
    movie.save();
    res.json({ msg: "Movie Uploaded" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getallmovies", (req, res) => {
  try {
    Movies.find({}, (err, movies) => {
      if (!err) {
        res.send(movies);
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/getmoviebyslug/:slug", async (req, res) => {
  try {
    const movie = await Movies.findOne({slug: req.params.slug});
    
    if(!movie) {
      return res.status(404).json({msg: "Movie not found"})
    }
    res.send(movie)
  } catch (error) {
    res.send(error);
  }
});

router.post("/getrecommendation", async (req, res) => {
  try {
    const data = req.body
    const movie = await Movies.find({genre: data.genre, _id: {$ne: data.id}});
    console.log(data)
    if(!movie) {
      return res.status(404).json({msg: "Movie not found"})
    }
    res.json(movie)
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
