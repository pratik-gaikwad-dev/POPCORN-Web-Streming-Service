import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModeContext from "../../context/Contexts/ModeContext";
import WebSeriesContext from "../../context/Contexts/WebSeriesContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SuggetionsCard from "../components/SuggetionsCard";
import "../../css/SeriesDesc.css";
import SeasonButton from "../components/SeasonButton";
import MovieWebseriesName from "../components/MovieWebseriesName";
const SeriesDesc = () => {
  // getting parameters fron url
  const { seriesslug, season } = useParams();

  // Using contexts
  const mode = useContext(ModeContext);
  const webseries = useContext(WebSeriesContext);

  const [watchmovie, setWatchmovie] = useState({});
  // if (seriesslug !== watchmovie.slug) {
  useEffect(() => {
    webseries.getWebseries(seriesslug, setWatchmovie);
    // eslint-disable-next-line
  }, []);
  // }
  // finding series which user wants to watch
  // let watchmovie = webseries.items.find((element) => {
  //   return element.slug === seriesslug;
  // });
  // console.log(watchmovie)
  // Changing Mode dark to light or light to dark
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }

  // styles for lite and dark mode
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };

  // webseries seasons
  const numberOfItems = watchmovie.seasons;

  // getting episodes
  let seasonname;
  const [ep, setEp] = useState([]);
  if (season === undefined) {
    seasonname = "season-1";
    webseries.getEpisodes(1, watchmovie.name, setEp);
  } else {
    let seasonnamearr = season.split("-");
    seasonname = season;
    let seasonNo = Number(seasonnamearr[1]);
    webseries.getEpisodes(seasonNo, watchmovie.name, setEp);
  }
  // console.log(ep)
  return (
    <>
      <Navbar showmenu={false} />
      <div
        className="watch-movie-container"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <div className="watch-movie-poster">
          <img src={watchmovie.image} alt="" />
        </div>
        <MovieWebseriesName
          name={watchmovie.name}
          genre={watchmovie.genre}
          description={watchmovie.description}
        />
        <div className="web-series">
          <div className="web-series-seasons">
            {numberOfItems > 0 ? (
              [...Array(numberOfItems).keys()].map((key) => (
                <SeasonButton
                  season={key + 1}
                  key={key}
                  address={webseries.btnAddress}
                  slug={seriesslug}
                />
              ))
            ) : (
              <SeasonButton
                season={1}
                address={webseries.btnAddress}
                slug={seriesslug}
              />
            )}
          </div>
          <div className="web-series-seasons-card">
            {Object.keys(ep).length !== 0
              ? ep.map((item, key) => (
                  <SuggetionsCard
                    key={key}
                    genre={`S${
                      item.season > 9 ? item.season : "0" + item.season
                    }`}
                    year={`E${
                      item.episode > 9 ? item.episode : "0" + item.episode
                    }`}
                    image={item.image}
                    name={item.name}
                    slug={item.slug}
                    address={`${webseries.btnAddress}/${seriesslug}/${seasonname}`}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeriesDesc;
