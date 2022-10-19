import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const AddWebSeriesForm = () => {
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
    const name = document.getElementById("webseries-name").value;
    const imagepath = document.getElementById("image-path").value;
    const seasons = document.getElementById("webseries-seasons").value;
    const moviegenre = document.getElementById("webseries-genre").value;
    const movieyear = document.getElementById("webseries-year").value;
    const moviedesc = document.getElementById("webseries-desc").value;
    const movietags = document.getElementById("webseries-tag").value;
    const movieslug = document.getElementById("webseries-slug").value;

    const data = {
      name: name,
      image: imagepath,
      seasons: seasons,
      genre: moviegenre,
      year: movieyear,
      description: moviedesc,
      tags: movietags,
      slug: movieslug,
    };
    try {
      const res = await axios.post(
        "http://localhost:7000/api/webseries/uploadwebseries",
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
              <h1>Add Web Series</h1>
              <div className="mb-3">
                {message === null ? null : (
                  <div className="alert alert-success" role="alert">
                    Message - {message}
                  </div>
                )}
              </div>
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
                    Web Series Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="webseries-name"
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
                    Web Series Genre
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="webseries-genre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Web Series Seasons
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    maxLength={2}
                    id="webseries-seasons"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Web Series Year
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="webseries-year"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Web Series Description
                  </label>
                  <textarea
                    className="form-control"
                    id="webseries-desc"
                    minLength="100"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Web Series Tags
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="webseries-tag"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Web Series Slug
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="webseries-slug"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={
                    imagePercentages !== 100
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

export default AddWebSeriesForm;
