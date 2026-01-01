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

    const topThree = [
      store.topList[0],
      store.topList[2],
      store.topList[3],
    ];
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

  // DisplayMovies();
}

await startMovies();


const topListContainer = document.querySelector(".movie__page__movies");
console.log(store.allMovies);
store.allMovies.forEach((movie) => {
  createPoster(movie, topListContainer);
});
