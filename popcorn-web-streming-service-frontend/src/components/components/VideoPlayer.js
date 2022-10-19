import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../context/Contexts/MessageContext";
import "../../css/VideoPlayer.css";
const VideoPlayer = (props) => {
  const navigate = useNavigate();
  const { showMessage } = useContext(MessageContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.load();
  }, [props]);

  const onPlay = () => {
    console.log("playing");
    const token = localStorage.getItem("token");
    const vid = document.getElementById("video-id");
    if (!token) {
      vid.pause();
      showMessage("error", "You have to login first to play the movie");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="video-player-main">
        <video
          ref={ref}
          poster={props.poster}
          onPlay={onPlay}
          id="video-id"
          controls
          preload="none"
        >
          <source src={props.video} type="video/webm" />
        </video>
      </div>
    </>
  );
};

export default VideoPlayer;
