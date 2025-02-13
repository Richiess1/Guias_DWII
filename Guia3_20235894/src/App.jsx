import { useState, useEffect } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./Hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useFetchMovies(query);
  const [watched, setWatched] = useState(() => {
    const storedWatched = localStorage.getItem("watchedMovies");
    return storedWatched ? JSON.parse(storedWatched) : [];
  });
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleDeleteWatched(movieId) {
    const updatedWatched = watched.filter(movie => movie.imdbID !== movieId);
    setWatched(updatedWatched);
    localStorage.setItem("watchedMovies", JSON.stringify(updatedWatched));
  }
  

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    const updatedWatched = [...watched, movie];
    setWatched(updatedWatched);
  }

  function handleDeleteWatched(movieId) {
    const updatedWatched = watched.filter(movie => movie.imdbID !== movieId);
    setWatched(updatedWatched);
  }


  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>
        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
