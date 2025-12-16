import { OMDB_API_KEY } from "./config";

export const getMovieData = async (imdbId) => {
  const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
};

fetchAndStoreAllMovies = async () => {
  ourMovies.map((id) => {
    getMovieData(id)
  });
  const moviePromises = 
}












const ourMovies = ['tt0099785', 'tt0107290', 'tt26443597', 'tt0108252', 'tt0118799', 'tt1675434', 'tt0137523', 'tt0114369', 'tt0110413', 'tt0088763', 'tt0133093', 'tt1375666'];

ourMovies.forEach(id => getMovieData(id));

const allMovies = [];