import {debounce, getRandomArrayElement} from './util.js';
import {renderPhotos} from './thumbnails.js';

const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');
const defaultFilter = filters.querySelector('#filter-default');
const RANDOM_IMAGES_AMOUNT = 10;

const getRandomImages = (similarPhotos) => {
  const randomImagesList = [];

  for (let i = 0; i < RANDOM_IMAGES_AMOUNT; i++) {
    let random = getRandomArrayElement(similarPhotos);

    while (randomImagesList.includes(random)) {
      random = getRandomArrayElement(similarPhotos);
    }

    randomImagesList.push(random);
  }
  return randomImagesList;
};

const getDiscussedImages = (similarPhotos) => similarPhotos.slice().sort((a, b) => b.comments.length - a.comments.length);

const activateFilters = (similarPhotos) => {
  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', debounce((evt) => {
    if (evt.target.id === 'filter-random') {
      randomFilter.classList.add('img-filters__button--active');
      discussedFilter.classList.remove('img-filters__button--active');
      defaultFilter.classList.remove('img-filters__button--active');

      const randomPhotos = getRandomImages(similarPhotos);

      renderPhotos(randomPhotos);

    } else if (evt.target.id === 'filter-discussed') {
      discussedFilter.classList.add('img-filters__button--active');
      randomFilter.classList.remove('img-filters__button--active');
      defaultFilter.classList.remove('img-filters__button--active');

      const discussedPhotos = getDiscussedImages(similarPhotos);

      renderPhotos(discussedPhotos);

    } else if (evt.target.id ==='filter-default') {
      defaultFilter.classList.add('img-filters__button--active');
      randomFilter.classList.remove('img-filters__button--active');
      discussedFilter.classList.remove('img-filters__button--active');

      renderPhotos(similarPhotos);
    }

  },RERENDER_DELAY));
};

export {activateFilters};
