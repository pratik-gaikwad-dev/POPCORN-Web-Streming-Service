import React, { useState } from "react";
import FilterContext from "../Contexts/FilterContext";
import axios from "axios";
import config from "../../config.json";
const FilterStates = (props) => {
  const [presentGenre, setPresentGenre] = useState(null);
  const [watchmovie, setWatchmovie] = useState({});
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const filterMovies = async (genre, setItems) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/getitems/${genre}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setItems(resp);
      // setFilter(resp);
      setPresentGenre(genre);
    } catch (error) {
      console.log(error);
    }
  };
  const searchMovies = async (query) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/search/${query}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setWatchmovie(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const addLikes = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/addlike/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const getLikes = async (slug) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/getlikes/${slug}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setLikes(resp.likes);
    } catch (error) {
      console.log(error);
    }
  };
  const checkLike = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/checklike/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      setLiked(resp.liked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FilterContext.Provider
      value={{
        presentGenre,
        filterMovies,
        searchMovies,
        watchmovie,
        addLikes,
        getLikes,
        likes,
        liked,
        checkLike,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterStates;
