import React, { useState } from "react";
import FilterContext from "../Contexts/FilterContext";
import axios from "axios";
import config from "../../config.json";
const FilterStates = (props) => {
  const [presentGenre, setPresentGenre] = useState(null);
  const [watchmovie, setWatchmovie] = useState({});
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
  return (
    <FilterContext.Provider
      value={{
        presentGenre,
        filterMovies,
        searchMovies,
        watchmovie,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterStates;
