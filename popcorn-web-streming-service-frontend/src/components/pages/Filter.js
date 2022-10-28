import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import MenuContext from "../../context/Contexts/MenuContext";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ModeContext from "../../context/Contexts/ModeContext";
import FilterContext from "../../context/Contexts/FilterContext";
const Filter = () => {
  const menu = useContext(MenuContext);
  const mode = useContext(ModeContext);
  const { presentGenre, filterMovies } = useContext(FilterContext);
  const { genre } = useParams();
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };
  let splitGenreArray = genre.split("-");
  let genreType = "";
  for (let i = 0; i < splitGenreArray.length; i++) {
    const element =
      splitGenreArray[i].charAt(0).toUpperCase() + splitGenreArray[i].slice(1);
    genreType = genreType + " " + element;
  }
  let address;
  const [items, setItems] = useState([]);

  if (presentGenre !== genre) {
    filterMovies(genre, setItems);
  }
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  return (
    <>
      <Navbar showmenu={false} />
      <Grid container spacing={0}>
        {!menu.show ? (
          <Grid sm={12} xs={12} md={12} lg={12} item={true}>
            <h2
              className="web-series-header"
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              {genreType} <hr />
            </h2>
            <div
              className="movies-main"
              style={
                items.length === 0
                  ? { paddingBottom: "30%" }
                  : { paddingBottom: "15%" }
              }
            >
              {items.length === 0 ? (
                <h2 style={mode.checked === false ? darkStyle : lightStyle}>
                  No results for {genreType}
                </h2>
              ) : null}
              {items.map((item, key) => (
                <Card
                  image={item.image}
                  genre={item.genre}
                  year={item.year}
                  address={address}
                  slug={item.slug}
                  name={item.name}
                  key={key}
                />
              ))}
            </div>
          </Grid>
        ) : (
          <Grid sm={9} xs={9} md={9} lg={9} item={true}>
            <h2
              className="web-series-header"
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              {genreType} <hr />
            </h2>
            <div className="movies-main">
              {items.map((item, key) => (
                <Card
                  image={item.image}
                  genre={item.genre}
                  year={item.year}
                  address={address}
                  slug={item.slug}
                  name={item.name}
                  key={key}
                />
              ))}
            </div>
          </Grid>
        )}
      </Grid>
      <Footer />
    </>
  );
};

export default Filter;
