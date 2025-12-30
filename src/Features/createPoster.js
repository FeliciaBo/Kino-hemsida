import { getGenreNames } from "../API/genreID";

const IMG_BASE = "https://image.tmdb.org/t/p/w780";

export const createPoster = (movie, container) => {
  if (!movie || !container) return;

  const path = movie.poster_path;
  if (!path) return;

  const imgUrl = `${IMG_BASE}${path}`;

  const newPoster = document.createElement("div");
  newPoster.classList.add("movie-poster");

  newPoster.innerHTML = `
    <img src="${imgUrl}" alt="${movie.title}">
    <div class="movie-info">
      <h2>${movie.title}</h2>
      <button class="movie-info-icon" aria-label="More info">
        <img src="/img/info.png" alt="information about the movie">
        </button>
      <h3>${getGenreNames(movie.genre_ids)}</h3>
    </div>
  `;

  container.appendChild(newPoster);
};
