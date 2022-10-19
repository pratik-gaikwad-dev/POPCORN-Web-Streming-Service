import React, { useContext } from "react";
import ModeContext from "../../context/Contexts/ModeContext";
import "../../css/MovieWebseriesName.css";
const MovieWebseriesName = (props) => {
  const darkStyle_2 = {
    backgroundColor: "#1c212e",
  };
  const lightStyle_2 = {
    backgroundColor: "#eeeff0",
  };
  const mode = useContext(ModeContext);
  return (
    <>
      <div
        className="watch-movie-name-container"
        style={mode.checked === false ? darkStyle_2 : lightStyle_2}
      >
        <div className="watch-movie-name">
          <div className="watch-movie-name-name">
            <h1>{props.name}</h1>
          </div>
          <div className="watch-movie-genre">{props.genre}</div>
        </div>
        <div className="watch-movie-name name-right-side">
          <div className="watch-movie-likes">
            <i className="fa-solid fa-thumbs-up fa-2xl" style={{cursor: "pointer"}}></i>
            <br />
            &nbsp;&nbsp;1+
          </div>
          <div className="watch-movie-likes">
             <p>100<h4>Views</h4></p>
          </div>
        </div>
      </div>
      <div
        className="watch-movie-description watchmovie-c"
        style={mode.checked === false ? darkStyle_2 : lightStyle_2}
      >
        <p className="movie-description">{props.description}</p>
      </div>
    </>
  );
};

export default MovieWebseriesName;
