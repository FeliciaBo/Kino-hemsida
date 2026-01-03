import { store } from "../../API/moviesApi";

export function filterMoviesByTitle(searchText) {
  return store.allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText)
  );
}
