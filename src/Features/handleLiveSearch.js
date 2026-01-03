import { filterMoviesByTitle } from "./Filter/textSearch";

export function handleLiveSearch(
  searchInput,
  renderMovies,
  renderFilteredMovieList,
  renderNoResultsMessage
) {
  const value = searchInput.value.trim().toLowerCase();

  if (value === "") {
    renderMovies();
    return;
  }

  const filteredByTitle = filterMoviesByTitle(value);

  if (filteredByTitle.length === 0) {
    renderNoResultsMessage(value);
    return;
  }

  renderFilteredMovieList(filteredByTitle);
}
