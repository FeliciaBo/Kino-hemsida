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

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const mobileIcons = document.querySelectorAll('.mobile-nav_item');


// Klick på hamburgare
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');

  if (!navMenu.classList.contains('active')) {
    mobileIcons.forEach(icon => icon.classList.remove('active'));
  }
});

// Klick på ikon → markera active
mobileIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Toggle 'active' på den klickade ikonen
    if (icon.classList.contains('active')) {
      icon.classList.remove('active');
    } else {
      // Ta bort 'active' från alla andra
      mobileIcons.forEach(i => i.classList.remove('active'));
      icon.classList.add('active');
    }
  });
});

// Klick utanför stänger menyn och resetar active
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    mobileIcons.forEach(icon => icon.classList.remove('active'));
  }
});


// Desktop 
const desktopDropdown = document.querySelector('.nav_item_dropdown');
const desktopLink = desktopDropdown.querySelector('.nav_link');

// Klick på "Mer ▾"
desktopLink.addEventListener('click', (e) => {
  e.preventDefault();
  desktopDropdown.classList.toggle('active');
});

// Klick utanför stänger dropdown
document.addEventListener('click', (e) => {
  if (!desktopDropdown.contains(e.target)) {
    desktopDropdown.classList.remove('active');
  }
});
