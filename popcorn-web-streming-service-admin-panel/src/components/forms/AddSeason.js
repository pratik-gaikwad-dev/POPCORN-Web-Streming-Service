import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const AddSeason = () => {
    const [message, setMessage] = useState(null);
    const onSubmitData = async (e) => {
        e.preventDefault();
        const seriesname = document.getElementById("select-webseries").value;
        const res = await axios.put(
            `http://localhost:7000/api/webseries/addseason`,
            {
                name: seriesname
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resp = await res.data;
          setMessage(resp.msg);
    }
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
              <h1>Add Season</h1>
              <div className="mb-3">
                {message === null ? null : (
                  <div className="alert alert-success" role="alert">
                    Message - {message}
                  </div>
                )}
              </div>
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
                    onLoad={getAllWebSeries}
                  >
                    <option defaultValue>Webseries Name</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
                <button type="submit" onClick={getAllWebSeries} className="btn btn-primary mt-3 mx-2">
                  Load Webseries
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

export default AddSeason;
