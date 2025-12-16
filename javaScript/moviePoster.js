import {OMDB_API_KEY} from './config.js';
export const getMoviePoster = async (imdbId) => {
  const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let highResPoster = data.Poster.replace("SX300", "SX1000");
  let container = document.querySelector('.poster-container');
  let newPoster = document.createElement('div');
  newPoster.classList.add('movie-poster');
  newPoster.innerHTML = `<img src="${highResPoster}"> 
  <div class="movie-info"> 
    <h2>${data.Title}</h2> 
    <h3>${data.Genre}</h3>
    </div>`;
  container.appendChild(newPoster);
}