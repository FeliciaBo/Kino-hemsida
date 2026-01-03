export function initTagFilter({
  store,
  clearMovies,
  renderFilteredMovieList
}) {
  const buttons = document.querySelectorAll(".tagsbtn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      
      buttons.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      const tag = btn.textContent.trim();
      let moviesToShow = [];

      if (tag === "Aktuellt") {
        moviesToShow = store.nowPlaying;
      }

      if (tag === "Barnfilmer") {
        moviesToShow = store.kids;
      }

      if (tag === "Klassiker") {
        moviesToShow = store.classics;
      }

      clearMovies();
      renderFilteredMovieList(moviesToShow);
    });
  });
}
