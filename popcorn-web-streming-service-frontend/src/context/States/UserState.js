import React, { useState } from "react";
import UserContext from "../Contexts/UserContext";
import config from "../../config.json";
import axios from "axios";

const UserState = (props) => {
  const [loggedin, setLoggedin] = useState(false);
  let data = null;
  const token = localStorage.getItem("token");
  const key = localStorage.getItem("key");
  console.log(key);
  const sendMail = async () => {
    data = {
      message: `Click this link to verify account ${config.mail.url}`,
      user: localStorage.getItem("id"),
    };
    try {
      const res = await axios.post(`${config.api.auth}/sendmail`, data, {
        headers: {
          "Content-Type": "application/json",
          authtoken: `${token}`,
        },
      });
      const resp = res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const verifyAccount = async (key) => {
    try {
      const res = await axios.post(
        `${config.api.auth}/markverified`,
        {
          key: key,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <UserContext.Provider
        value={{ data, loggedin, setLoggedin, token, sendMail, verifyAccount }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
