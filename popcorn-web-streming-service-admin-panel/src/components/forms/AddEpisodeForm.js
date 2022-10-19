import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
const AddEpisodeForm = () => {
  const getAllWebSeries = async () => {
    try {
      const res = await axios.post(
        `http://localhost:7000/api/webseries/getallwebseries`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        const para = document.createElement("option");
        para.value = element.name;
        para.innerText = element.name;
        document.getElementById("select-webseries").appendChild(para);
        console.log(element);
      }
    } catch (error) {}
  };
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
    getAllWebSeries();
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
    const name = document.getElementById("web-ep-name").value;
    const seriesname = document.getElementById("select-webseries").value;
    const imagepath = document.getElementById("image-path").value;
    const video = document.getElementById("web-path").value;
    const episode = document.getElementById("web-ep").value;
    const season = document.getElementById("web-season").value;
    const slug = document.getElementById("web-slug").value;

    const data = {
      name: name,
      seriesname: seriesname,
      image: imagepath,
      video: video,
      season: season,
      episode: episode,
      slug: slug,
    };
    try {
      const res = await axios.post(
        "http://localhost:7000/api/webseries/uploadepisodes",
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
  if (message !== null) {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
  return (
    <div className="grid-main">
      <div className="grid-items">
        <div className="grid-item-1" id="menu">
          <Sidebar />
        </div>
        <div className="grid-item-2">
          <Navbar />

          <div className="add-movie-form-main">
            <h1>Add Episode</h1>
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
                  Episode
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
                <select
                  className="form-select"
                  id="select-webseries"
                  aria-label="Default select example"
                  required
                >
                  <option defaultValue>Webseries Name</option>
                </select>
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
                  Webseries Path
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="web-path"
                  value={uploadfile}
                  disabled
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formName" className="form-label">
                  Webseries Episode Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="web-ep-name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formName" className="form-label">
                  Webseries Episode
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="web-ep"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formName" className="form-label">
                  Webseries Season
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="web-season"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formName" className="form-label">
                  Webseries Slug
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="web-slug"
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
  );
};

export default AddEpisodeForm;
