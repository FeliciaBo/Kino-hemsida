// genreID.js
import { fetchMovieGenres } from "./genresApi";

let genreMap = {};


export async function initGenres() {
  const genres = await fetchMovieGenres();

  genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});
}


export function getGenreNameById(id) {
  return genreMap[id] || null;
}

export function getGenreNames(genreIds, max = 3) {
  if (!Array.isArray(genreIds)) return "";

  return genreIds
    .map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, max)
    .join(", ");
}
