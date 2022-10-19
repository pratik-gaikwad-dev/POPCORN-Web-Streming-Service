import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import axios from "axios";
import "../../css/AddMovieForm.css";
const AddMovieForm = () => {
  // States for movie
  const [file, setFile] = useState("");
  const [uploadfile, setUploadfile] = useState("");
  const [uploadPercentages, setUploadPercentages] = useState(0);

  // Functions for upload movies
  const onChangeMovie = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmitMovie = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/uploadmovie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentages(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      const { filePath, msg } = res.data;
      setUploadfile(filePath);
      setMessage(msg);
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server error");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  // State for upload image
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imagePercentages, setImagePercentages] = useState(0);
  const [message, setMessage] = useState(null);
  // functions for upload image
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const onSubmitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post(
        "http://localhost:8000/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setImagePercentages(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      const { filePath, msg } = res.data;
      setImagePath(filePath);
      setMessage(msg);
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server error");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    const name = document.getElementById("movie-name").value;
    const imagepath = document.getElementById("image-path").value;
    const moviepath = document.getElementById("movie-path").value;
    const moviegenre = document.getElementById("movie-genre").value;
    const movieyear = document.getElementById("movie-year").value;
    const moviedesc = document.getElementById("movie-desc").value;
    const movietags = document.getElementById("movie-tag").value;
    const industry = document.getElementById("movie-industry").value;
    const movieslug = document.getElementById("movie-slug").value;

    const data = {
      name: name,
      image: imagepath,
      video: moviepath,
      genre: moviegenre,
      year: movieyear,
      description: moviedesc,
      tags: movietags,
      slug: movieslug,
      industry: industry,
    };
    try {
      const res = await axios.post(
        "http://localhost:7000/api/movies/uploadmovie",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { msg } = res.data;
      setMessage(msg);
      console.log(name);
    } catch (error) {}
  };
  console.log(message);
  if (message !== null) {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
  return (
    <>
      <div className="grid-main">
        <div className="grid-items">
          <div className="grid-item-1" id="menu">
            <Sidebar />
          </div>
          <div className="grid-item-2">
            <Navbar />

            <div className="add-movie-form-main">
              <h1>Add Movie</h1>
              <div className="mb-3">
                {message === null ? null : (
                  <div className="alert alert-success" role="alert">
                    Message - {message}
                  </div>
                )}
              </div>
              <form
                onSubmit={onSubmitMovie}
                encType="multipart/form-data"
                method="post"
              >
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Movie
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={onChangeMovie}
                  />
                </div>
                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadPercentages}%` }}
                  >
                    {uploadPercentages}%
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
              <form
                onSubmit={onSubmitImage}
                encType="multipart/form-data"
                method="post"
                className="mt-5"
              >
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={onChangeImage}
                    required
                  />
                </div>
                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${imagePercentages}%` }}
                  >
                    {imagePercentages}%
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
              <form
                onSubmit={onSubmitData}
                encType="multipart/form-data"
                method="post"
                className="mt-5"
              >
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="movie-name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Image Path
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="image-path"
                    value={imagePath}
                    disabled
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Path
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="movie-path"
                    value={uploadfile}
                    disabled
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Genre
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="movie-genre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    id="movie-industry"
                    aria-label="Default select example"
                    required
                  >
                    <option defaultValue>Industry Name</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Bollywood">Bollywood</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Year
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="movie-year"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Description
                  </label>
                  <textarea
                    className="form-control"
                    id="movie-desc"
                    minLength="100"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Tags
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="movie-tag"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Movie Slug
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="movie-slug"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={
                    uploadfile !== 100 && imagePercentages !== 100
                      ? "disabled"
                      : ""
                  }
                >
                  Submit
                </button>
                {message !== null ? <h1>{message}</h1> : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovieForm;
