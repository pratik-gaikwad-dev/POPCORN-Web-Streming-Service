import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/Sidebar";
import MenuContext from "../../context/Contexts/MenuContext";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import MovieContext from "../../context/Contexts/MovieContext";
import WebSeriesContext from "../../context/Contexts/WebSeriesContext";
import ModeContext from "../../context/Contexts/ModeContext";
const Filter = () => {
  const menu = useContext(MenuContext);
  const movie = useContext(MovieContext);
  const webseries = useContext(WebSeriesContext);
  const mode = useContext(ModeContext);
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
  let items;
  if (genre === "tv-series") {
    items = webseries.items;
    genreType = "TV-Series";
    address = webseries.btnAddress;
  } else {
    items = movie.items;
    address = movie.btnAddress;
  }
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  return (
    <>
      <Navbar showmenu={true} />
      <Grid container spacing={0}>
        <Grid xs={2.5} item={true}>
          {menu.show ? <Menu /> : <Sidebar />}
        </Grid>
        {!menu.show ? (
          <Grid sm={12} xs={12} md={12} lg={9} item={true}>
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
