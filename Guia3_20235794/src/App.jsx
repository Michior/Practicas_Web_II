  import { useEffect, useState } from "react";
  import { Logo, Nav, NumResults, Search } from "./componentes/Nav.jsx";
  import { Box } from "./componentes/Box";
  import { MovieList } from "./componentes/Movie";
  import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./componentes/WatchedMovie";
  import { useFetchMovies } from "./hooks/useFetchMovies.js";
  import { MovieDetails } from "./componentes/MovieDetails";

  /**  * Componente principal de la aplicación.  */

  export default function App() {
    //estado para la busqueda de la pelicula
    const [query, setQuery] = useState("");

    //obtiene peliclas basadas en la consulta
    const { movies, isLoading, error } = useFetchMovies(query);

    //Estado de peliculas vistas
    const [watched, setWatched] = useState(() => {
      const saveWatchedMovies = localStorage.getItem('watchedMovies');
      return saveWatchedMovies ? JSON.parse(saveWatchedMovies) : [];
    });
    

    //estado para la pelicula seleccionada
    const [selectedId, setSelectedId] = useState(null);

    /**    * Maneja la selección de una película.    
     * @param {string} id - ID de la película seleccionada.    */

    function handleSelectMovie(id) {
      setSelectedId(id);
    }

    /**    * Cierra los detalles de la película.    */
    function handleCloseMovie() {
      setSelectedId(null);
    } 

    function handleDeleteMovie(selectedId) {
      setWatched(watched.filter(movie => movie.imdbID !== selectedId));
    }


    /**    * Agrega una película a la lista de vistas.    
     * @param {Object} movie - Película a agregar.    */

    function handleAddWatched(movie) {
      setWatched((prevWatched) => {
        const newWatchedMovie = [...prevWatched, movie];
        localStorage.setItem('watchedMovies', JSON.stringify(newWatchedMovie));
        return newWatchedMovie;
      });
    }

    useEffect(()=>{
      localStorage.setItem('watchedMovies', JSON.stringify(watched));
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
                  <WatchedMoviesList watched={watched} onDeleteMovie={handleDeleteMovie}/>
                </>
              )}
            </WatchedMoviesContainer>
          </Box>
        </main>
      </>
    );
  }
