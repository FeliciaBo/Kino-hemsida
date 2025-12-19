import { createPoster } from "./createPoster";

export const initCarousel = (root, movies) => {
  if (!root || !Array.isArray(movies) || movies.length === 0) return;

  root.innerHTML = `
    <button class="carousel__btn carousel__btn--prev">‹</button>
    <div class="carousel__viewport">
      <div class="carousel__track"></div>
    </div>
    <button class="carousel__btn carousel__btn--next">›</button>
  `;

  const track = root.querySelector(".carousel__track");
  const prevBtn = root.querySelector(".carousel__btn--prev");
  const nextBtn = root.querySelector(".carousel__btn--next");

  movies.forEach((movie) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel__slide");
    track.appendChild(slide);
    createPoster(movie, slide);
  });

  const slides = track.children;
  let index = 0;

  const update = () => {
    const width = slides[0].offsetWidth;
    track.style.transform = `translateX(${-index * width}px)`;
  };

  const next = () => {
    index = (index + 1) % slides.length;
    update();
  };

  const prev = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  window.addEventListener("resize", update);

  update();
};
