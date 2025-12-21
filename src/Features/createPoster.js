const IMG_BASE = "https://image.tmdb.org/t/p/w780";

export const createPoster = (movie, container) => {
  if (!movie || !container) return;

  const IMG_BASE = "https://image.tmdb.org/t/p/w780";

  const posterPath = movie.poster_path;
  const backdropPath = movie.backdrop_path || posterPath;

  if (!posterPath) return;

  container.innerHTML = `
    <div class="poster-frame">
      <img
        class="poster-frame__bg"
        src="${IMG_BASE}${backdropPath}"
        alt=""
        aria-hidden="true"
      />

      <img
        class="poster-frame__img"
        src="${IMG_BASE}${posterPath}"
        alt="${movie.title}"
      />

      <div class="poster-frame__info">
        <h2>${movie.title}</h2>
        <p>${movie.release_date?.slice(0, 4) || ""}</p>
      </div>
    </div>
  `;
};
