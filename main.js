import {OMDB_API_KEY} from './config.js';
import './main.scss';

const getMoviePoster = async (imdbId) => {
  const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let highResPoster = data.Poster.replace("SX300", "SX1000");
  let container = document.querySelector('.poster-container');
  let newPoster = document.createElement('div');
  newPoster.classList.add('movie-poster');
  newPoster.innerHTML = `<h2>${data.Title}</h2> <img src="${highResPoster}"</img>`;
  container.appendChild(newPoster);
}

const ourMovies = ['tt0099785', 'tt0107290', 'tt26443597', 'tt0108252', 'tt0118799', 'tt1675434', 'tt0137523', 'tt0114369'];
ourMovies.forEach(id => getMoviePoster(id));