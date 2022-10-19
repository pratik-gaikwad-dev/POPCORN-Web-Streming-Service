import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddEpisodeForm from "./components/forms/AddEpisodeForm";
import AddMovieForm from "./components/forms/AddMovieForm";
import AddSeason from "./components/forms/AddSeason";
import AddWebSeriesForm from "./components/forms/AddWebSeriesForm";
import Home from "./components/Home";
import MenuState from "./context/States/MenuState";
function App() {
  return (
    <Router>
      <MenuState>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addmovie" element={<AddMovieForm />} />
          <Route exact path="/addwebseries" element={<AddWebSeriesForm />} />
          <Route exact path="/addepisode" element={<AddEpisodeForm />} />
          <Route exact path="/addseason" element={<AddSeason />} />
        </Routes>
      </MenuState>
    </Router>
  );
}

export default App;
