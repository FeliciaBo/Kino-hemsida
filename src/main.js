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
import { bindBackdrops, initCarousel } from "./Features/carousel";

// 1. Hämta all data först (Genrer och Filmer)
await initGenres();
console.log(getGenreNames([28, 878, 12]));
await startMovies();

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

  console.log("Store Now Playing:", store.nowPlaying);
  console.log("Store Top List:", store.topList);
  console.log("Store Kids:", store.kids);
  console.log("Store Classics:", store.classics);
  console.log("All movies in Store:", store.allMovies);
}

// 2. Definiera laddningsfunktioner för HTML
async function loadHeader() {
  const response = await fetch("/Partials/header.html");
  const html = await response.text();
  document.querySelector(".header-container").innerHTML = html;
}

async function loadFooter() {
  const response = await fetch("/partials/footer.html");
  const html = await response.text();
  document.querySelector(".footer__container").innerHTML = html;
}

async function loadToplistCarousel() {
  const container = document.querySelector("#toplist-carousel");

  if (!container) return;

  try {
    const response = await fetch("/Partials/carousel.html");
    const html = await response.text();
    container.innerHTML = html;

    const topThree = [store.topList[0], store.topList[1], store.topList[2]];
    bindBackdrops(topThree);
    initCarousel();
  } catch (err) {
    console.error("Kunde inte ladda karusellen:", err);
  }
}

// 3. Kör laddning av HTML och vänta på att de blir klara
await loadHeader();
await loadFooter();
await loadToplistCarousel();

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

// 4. Slutligen, rendera posters (nu när containern garanterat finns)
renderMovies();

function renderMovies() {
  if (!moviesWrapper) return;
  clearMovies();

  // Sortera alla filmer efter betyg, högst först
  const sortedMovies = [...store.allMovies].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  // Topp 10 filmer hamnar automatiskt först
  sortedMovies.forEach((movie) =>
    createPoster(movie, moviesWrapper)
  );
}


function clearMovies() {
  if (!moviesWrapper) return;
  moviesWrapper.innerHTML = "";
}

function renderNoResultsMessage(searchText) {
  if (!moviesWrapper) return;
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
  if (!moviesWrapper) return;
  clearMovies();
  movies.forEach((movie) => createPoster(movie, moviesWrapper));
}

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const mobileIcons = document.querySelectorAll(".mobile-nav_item");

// Klick på hamburgare
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  if (!navMenu.classList.contains("active")) {
    mobileIcons.forEach((icon) => icon.classList.remove("active"));
  }
});

// Klick på ikon → markera active
mobileIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    // Toggle 'active' på den klickade ikonen
    if (icon.classList.contains("active")) {
      icon.classList.remove("active");
    } else {
      // Ta bort 'active' från alla andra
      mobileIcons.forEach((i) => i.classList.remove("active"));
      icon.classList.add("active");
    }
  });
});

// Klick utanför stänger menyn och resetar active
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    mobileIcons.forEach((icon) => icon.classList.remove("active"));
  }
});

// Desktop
const desktopDropdown = document.querySelector(".nav_item_dropdown");
const desktopLink = desktopDropdown.querySelector(".nav_link");

// Klick på "Mer ▾"
desktopLink.addEventListener("click", (e) => {
  e.preventDefault();
  desktopDropdown.classList.toggle("active");
});

// Klick utanför stänger dropdown
document.addEventListener("click", (e) => {
  if (!desktopDropdown.contains(e.target)) {
    desktopDropdown.classList.remove("active");
  }
});
