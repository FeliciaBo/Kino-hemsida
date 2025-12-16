
import '../sass/main.scss';
import {header} from './header.js';
import {footer} from './footer.js';
import { getMoviePoster} from './moviePoster.js';

 const headerContainer = document.querySelector('.header-container');
 if (headerContainer) {
  const headerElement = header();
  headerContainer.appendChild(headerElement);
 }
  const footerContainer = document.querySelector('.footer-container');
 if (footerContainer) {
  const footerElement = footer();
  footerContainer.appendChild(footerElement);
 }


export const ourMovies = ['tt0099785', 'tt0107290', 'tt26443597', 'tt0108252', 'tt0118799', 'tt1675434', 'tt0137523', 'tt0114369', 'tt0110413', 'tt0088763', 'tt0133093', 'tt1375666'];

ourMovies.forEach(id => getMoviePoster(id));

let movieDataArray = [];