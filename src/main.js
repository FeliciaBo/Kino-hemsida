import "./sass/main.scss";
import {
  store,
  fetchNowPlaying,
  fetchToplist,
  fetchKidsMovies,
  fetchClassics,
} from "./API/moviesApi";
import { createPoster } from "./Features/createPoster";
import { initGenres, getGenreNames } from "./API/genreID";
import { handleLiveSearch } from "./Features/handleLiveSearch";

const moviesWrapper = document.querySelector(".movie__page__movies");
const searchInput = document.getElementById("searchInputMovies");
const searchBtn = document.getElementById("searchBtnMovies");

if (moviesWrapper && searchInput && searchBtn) {
  searchInput.addEventListener("input", () =>
    handleLiveSearch(
      searchInput,
      renderMovies,
      renderFilteredMovieList,
      renderNoResultsMessage
    )
  );

  searchBtn.addEventListener("click", () =>
    handleLiveSearch(
      searchInput,
      renderMovies,
      renderFilteredMovieList,
      renderNoResultsMessage
    )
  );
}

await initGenres();

console.log(getGenreNames([28, 878, 12]));

import { bindBackdrops, initCarousel } from "./Features/carousel";
await fetchToplist();

// Ladda header
async function loadHeader() {
  const response = await fetch("/Partials/header.html");
  const html = await response.text();
  document.querySelector(".header-container").innerHTML = html;
}
loadHeader();

async function loadFooter() {
  const response = await fetch("/partials/footer.html");
  const html = await response.text();
  document.querySelector(".footer__container").innerHTML = html;
}
loadFooter();
async function loadToplistCarousel() {
  const container = document.querySelector("#toplist-carousel");

  if (!container) return;

  try {
    const response = await fetch("/Partials/carousel.html");
    const html = await response.text();
    container.innerHTML = html;

    const topThree = [store.topList[0], store.topList[2], store.topList[3]];
    bindBackdrops(topThree);
    initCarousel();
  } catch (err) {
    console.error("Kunde inte ladda karusellen:", err);
  }
}

loadToplistCarousel();

async function startMovies() {
  try {
    await fetchNowPlaying();
  } catch (error) {
    console.error(error.message);
  }

  try {
    await fetchToplist();
  } catch (error) {
    console.error(error.message);
  }

  try {
    await fetchKidsMovies();
  } catch (error) {
    console.error(error.message);
  }

  try {
    await fetchClassics();
  } catch (error) {
    console.error(error.message);
  }

  //loggar för att förnekla overview om någon vill ha det
  console.log("Store Now Playing:", store.nowPlaying);
  console.log("Store Top List:", store.topList);
  console.log("Store Kids:", store.kids);
  console.log("Store Classics:", store.classics);
  console.log("All movies in Store:", store.allMovies);

  renderMovies();
}

await startMovies();

function renderMovies() {
  clearMovies();
  store.allMovies.forEach((movie) => createPoster(movie, moviesWrapper));
}

function clearMovies() {
  moviesWrapper.innerHTML = "";
}

function renderNoResultsMessage(searchText) {
  clearMovies();

  const message = document.createElement("div");
  message.className = "no-results";

  message.innerHTML = `
    <h3>Inga träffar</h3>
    <p>Vi hittade inga filmer som matchar <strong>"${searchText}"</strong>.</p>
  `;

  moviesWrapper.appendChild(message);
}

function renderFilteredMovieList(movies) {
  clearMovies();
  movies.forEach((movie) => createPoster(movie, moviesWrapper));
}

// const topListContainer = document.querySelector(".movie__page__movies");
// console.log(store.allMovies);
// store.allMovies.forEach((movie) => {
//   createPoster(movie, topListContainer);
// });

// store.allMovies.forEach((movie) => {
//   createPoster(movie, topListContainer);
// });
