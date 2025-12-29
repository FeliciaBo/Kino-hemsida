import { TMDB_API_KEY } from "./apiKey";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovieGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=sv-SE`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await res.json();
  return data.genres;
}
