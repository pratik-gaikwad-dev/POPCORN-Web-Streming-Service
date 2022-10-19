import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/Login.css";
import ModeContext from "../../context/Contexts/ModeContext";
import axios from "axios";
import AlertComp from "../components/AlertComp";
import MessageContext from "../../context/Contexts/MessageContext";
import config from "../../config.json";
import UserContext from "../../context/Contexts/UserContext";
const Signup = () => {
  const mode = useContext(ModeContext);
  const message = useContext(MessageContext);
  const user = useContext(UserContext);
  const lightStyle = {
    backgroundColor: "#f6f7f9",
    color: "black",
  };
  const darkStyle = {
    backgroundColor: "black",
    color: "white",
  };

  const backDark = {
    color: "white",
  };
  const backLight = {
    color: "black",
  };
  const inputLight = {
    border: "1px solid black",
    backgroundColor: "white",
  };
  const inputDark = {
    border: "1px solid white",
    backgroundColor: "white",
  };

  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }

  const onSignup = async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const cpassword = document.getElementById("signup-password-confirm").value;
    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      passwordConfirm: cpassword,
    };
    try {
      const res = await axios.post(`${config.api.auth}/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = res.data;
      console.log(resp);
      localStorage.setItem("token", resp.authtoken);
      localStorage.setItem("key", resp.authkey);
      localStorage.setItem("id", resp.userid);
      user.sendMail();
      if (resp.authtoken && resp.authkey) {
        message.showMessage(
          "success",
          "We have sent you a verification email, Please verify your account."
        );
      }
    } catch (error) {
      if (error.response.data.error) {
        message.showMessage("error", `${error.response.data.error}`);
      } else {
        message.showMessage("error", `${error.response.data.errors[0].msg}`);
      }
    }
  };

  return (
    <>
      <div className="login-main signup-container">
        {message.message === null ? null : (
          <AlertComp type={message.messageType} message={message.message} />
        )}
        <form
          onSubmit={onSignup}
          className="login-frame"
          style={mode.checked === false ? darkStyle : lightStyle}
        >
          <h1>Signup</h1>
          <div className="login-component-1 login-component">
            <label>Name</label>
            <br />
            <input
              type="text"
              id="signup-name"
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-1 login-component">
            <label>Email</label>
            <br />
            <input
              type="email"
              id="signup-email"
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-1 login-component">
            <label>Username</label>
            <br />
            <input
              type="text"
              id="signup-username"
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-2 login-component">
            <label>Password</label>
            <br />
            <input
              type="password"
              id="signup-password"
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-2 login-component">
            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              id="signup-password-confirm"
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-3 login-component">
            <button className="login-btn">Signup</button>
            <Link
              to="/login"
              className="login-forget-password"
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Login
            </Link>
          </div>
          <hr className="login-divider" />
          <div className="login-component-4 login-component">
            <h4>Or Signin With</h4>
            <div className="social-login">
              <ul>
                <li className="login-facebook">
                  <i className="fa-brands fa-facebook fa-xl"></i>
                </li>
                <li className="login-instagram">
                  <i className="fa-brands fa-instagram fa-xl"></i>
                </li>
                <li className="login-twitter">
                  <i className="fa-brands fa-twitter fa-xl"></i>
                </li>
              </ul>
            </div>
          </div>
        </form>
        <Link
          to="/"
          className="back-login"
          style={mode.checked === false ? backDark : backLight}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back
        </Link>
      </div>
    </>
  );
};

export default Signup;