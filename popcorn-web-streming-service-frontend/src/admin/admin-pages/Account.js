import React, { useContext, useEffect } from "react";
import ModeContext from "../../context/Contexts/ModeContext";
import AdminNavbar from "../admin_component/AdminNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../css/Account.css";
import { TextField } from "@mui/material";
import UserContext from "../../context/Contexts/UserContext";
import MessageContext from "../../context/Contexts/MessageContext";
import { useNavigate } from "react-router-dom";
import AlertComp from "../../components/components/AlertComp";
const Account = () => {
  const navigate = useNavigate();
  const mode = useContext(ModeContext);
  const { getUser, user } = useContext(UserContext);
  const { showMessage, message, messageType } = useContext(MessageContext);
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }

  // console.log(user)
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      showMessage("error", "You need to login");
      navigate("/login");
    }
    if (user === null) {
      showMessage("error", "Token is invalid");
      navigate("/login");
    }
    getUser();
    // eslint-disable-next-line
  }, []);
  const lightStyle = {
    color: "black",
    backgroundColor: "white",
    boxShadow: "gray 4px 5px 20px 5px",
  };
  const darkStyle = {
    color: "white",
    backgroundColor: "black",
  };
  return (
    <>
      <AdminNavbar />
      {message === null ? null : (
        <AlertComp type={messageType} message={message} />
      )}
      <div className="profile-main">
        <div className="profile-container">
          <Card
            sx={{ minWidth: 275 }}
            className="profile-card"
            style={mode.checked === false ? darkStyle : lightStyle}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <label htmlFor="name">Name</label>
                <TextField
                  fullWidth
                  className="profile-input"
                  id="name"
                  value={user.name}
                  disabled
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <label htmlFor="username">Username</label>
                <TextField
                  fullWidth
                  className="profile-input"
                  id="username"
                  value={user.username}
                  disabled
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <label htmlFor="email">Email</label>
                <TextField
                  fullWidth
                  className="profile-input"
                  id="email"
                  value={user.email}
                  disabled
                />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Account;
