import "./sass/main.scss";
import {
  store,
  fetchNowPlaying,
  fetchToplist,
  fetchKidsMovies,
  fetchClassics,
} from "./API/moviesApi";

import { createPoster } from "./Features/createPoster";
import { bindBackdrops, initCarousel } from "./Features/carousel";
await fetchToplist();



// Ladda header
async function loadHeader() {
  const response = await fetch("/Partials/header.html");
  const html = await response.text();
  document.querySelector(".header-container").innerHTML = html;
}
loadHeader();

async function loadToplistCarousel() {
  const response = await fetch("/Partials/carousel.html");
  const html = await response.text();
  document.querySelector("#toplist-carousel").innerHTML = html;
}

await loadToplistCarousel();
const topThree = [
  store.topList[0],
  store.topList[2],
  store.topList[3],
];
bindBackdrops(topThree);
initCarousel();

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

const topListContainer = document.querySelector(".toplist-container");

store.nowPlaying.forEach((movie) => {
  createPoster(movie, topListContainer);
});