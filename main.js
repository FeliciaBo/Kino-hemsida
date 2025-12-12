const getMoviePoster = async (imdbId) => {
  const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${CONFIG.OMDB_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let container = document.querySelector('.poster-container');
  let newPoster = document.createElement('div');
  newPoster.classList.add('movie-poster');
  newPoster.innerHTML = `<h2>${data.Title}</h2> <img src="${data.Poster}"</img>`;
  container.appendChild(newPoster);
}

const ourMovies = ['tt0076759', 'tt0107290', 'tt0034583'];
ourMovies.forEach(id => getMoviePoster(id));