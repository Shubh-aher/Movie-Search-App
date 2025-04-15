import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = " Api key";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showResults, setShowResults] = useState(false); // State to track screen

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const searchMovies = async () => {
    if (!searchTerm) return;
    const response = await fetch(`${API_URL}${searchTerm}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
      setShowResults(true); // Show search results screen
    }
  };

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const goBack = () => {
    setShowResults(false); // Go back to home screen
    setSearchTerm(""); // Clear search field
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>

      {!showResults ? (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={searchMovies}>Search</button>
          </div>
          <h2>Favorites</h2>
          <div className="favorites-list">
            {favorites.map((fav) => (
              <div key={fav.imdbID} className="movie-card">
                <img src={fav.Poster} alt={fav.Title} />
                <h3>{fav.Title}</h3>
                <p>{fav.Year}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button className="back-button" onClick={goBack}>Back</button>
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button onClick={() => addToFavorites(movie)}>❤️ Favorite</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
