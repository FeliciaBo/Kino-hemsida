const IMG_BASE = "https://image.tmdb.org/t/p/w780";

let slideIndex = 1;

// Autoplay
let autoplayTimer = null;
const AUTOPLAY_DELAY = 3000;

export function initCarousel() {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      plusSlides(-1);
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      plusSlides(1);
      restartAutoplay();
    });
  }

  showSlides(slideIndex);
  startAutoplay();
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    plusSlides(1);
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function restartAutoplay() {
  startAutoplay();
}

export function bindBackdrops(movies) {
  const slides = document.querySelectorAll(".mySlides");

  movies.forEach((movie, i) => {
    const slide = slides[i];
    if (!slide || !movie?.backdrop_path) return;

    const img = slide.querySelector(".slide-img");
    const titleEl = slide.querySelector(".slide-title");

    if (img) {
      img.src = IMG_BASE + movie.backdrop_path;
      img.alt = movie.title || "Movie";
    }

    if (titleEl) {
      titleEl.textContent = movie.title || "";
    }
  });
}

