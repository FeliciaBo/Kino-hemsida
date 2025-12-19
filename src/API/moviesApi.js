import { TMDB_API_KEY } from "./apiKey";

export const store = {
  nowPlaying: [],
  topList: [],
  kids: [],
  classics: [],
  allMovies: [],
};

const addUniqueIdsToStore = (movies, targetArray, amount) => {
  const existingIds = new Set(store.allMovies.map((movie) => movie.id));

  const uniqueMovies = movies.filter((movie) => !existingIds.has(movie.id));
  const amountOfMovies = amount ? uniqueMovies.slice(0, amount) : uniqueMovies;

  store[targetArray] = amountOfMovies;
  store.allMovies.push(...amountOfMovies);
};

export const fetchNowPlaying = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=sv-SE&page=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB "Now Playing" error: ${response.status}`);
  }

  const data = await response.json();
  addUniqueIdsToStore(data.results, "nowPlaying");
};

export const fetchToplist = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=sv-SE&page=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB "Top List" error: ${response.status}`);
  }

  const data = await response.json();
  addUniqueIdsToStore(data.results, "topList");
};

export const fetchKidsMovies = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=sv-SE&with_genres=16,10751&include_adult=false&sort_by=popularity.desc&page=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB "Kids" error: ${response.status}`);
  }

  const data = await response.json();
  addUniqueIdsToStore(data.results, "kids", 5);
};

export const fetchClassics = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=sv-SE&primary_release_date.lte=2009-12-31&sort_by=popularity.desc&vote_count.gte=1000&include_adult=false&page=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB "Classics" error: ${response.status}`);
  }

  const data = await response.json();
  addUniqueIdsToStore(data.results, "classics", 5);
};
