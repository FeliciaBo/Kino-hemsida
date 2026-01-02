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
import { bindBackdrops, initCarousel } from "./Features/carousel";

// 1. Hämta all data först (Genrer och Filmer)
await initGenres();
console.log(getGenreNames([28, 878, 12]));

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

await startMovies();

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

    const topThree = [
      store.topList[0],
      store.topList[1],
      store.topList[2],
    ];
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

// 4. Slutligen, rendera posters (nu när containern garanterat finns)
const topListContainer = document.querySelector(".movie__page__movies");
console.log(store.allMovies);
store.allMovies.forEach((movie) => {
  createPoster(movie, topListContainer);
});


document.getElementById('menuToggle').addEventListener('click', function() {
  document.querySelector('.nav-menu').classList.toggle('active');
});

// Hämta länken "Mer ▾"
const merLink = document.querySelector('.nav_item > .nav_link');
const merItem = merLink.parentElement;

// Klick på "Mer ▾" öppnar/stänger dropdown
merLink.addEventListener('click', (e) => {
  e.preventDefault(); // hindrar scroll
  merItem.classList.toggle('active');
});

// Klick utanför stänger dropdown
document.addEventListener('click', (e) => {
  if (!merItem.contains(e.target)) {
    merItem.classList.remove('active');
  }
});
