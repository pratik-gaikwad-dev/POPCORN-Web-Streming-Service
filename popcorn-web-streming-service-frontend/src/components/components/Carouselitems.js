import React, { useContext } from "react";
import Carousel from "./Carousel";
import MCarousel from "react-material-ui-carousel";
import "../../css/Carousel.css";
import ModeContext from "../../context/Contexts/ModeContext";
const Carouselitems = () => {
  const mode = useContext(ModeContext);
  var items = [
    {
      name: "The Avengers",
      genre1: "Sci-Fi",
      genre2: "Action",
      year: "2014",
      image:
        "https://wallpapers.com/images/hd/marvel-superhero-movie-avengers-3p49xboy2uzn0w1t.jpg",
    },
    {
      name: "Avengers Infinity War",
      genre1: "Sci-Fi",
      genre2: "Action",
      year: "2019",
      image:
        "https://photobest1.com/wp-content/uploads/2018/05/Avengers-Infinity-War-wallpaper-hd-01.jpg",
    },
    {
      name: "Avengers End Game",
      genre1: "Sci-Fi",
      genre2: "Action",
      year: "2019",
      image:
        "https://i.pinimg.com/originals/33/db/a5/33dba54d4bae2749ba36785a8c28c7a6.jpg",
    },
  ];
  return (
    <>
      <MCarousel
        indicatorIconButtonProps={{
          style: {
            marginTop: "-80px", // 1
            color: mode.checked === false ? "white" : "black", // 3
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#24baef", // 2
          },
        }}
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            marginLeft: "60px",
            marginRight: "60px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        {items.map((item, i) => (
          <Carousel key={i} item={item} />
        ))}
      </MCarousel>
    </>
  );
};

export default Carouselitems;
