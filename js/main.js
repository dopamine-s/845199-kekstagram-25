import {renderPhotos} from'./thumbnails.js';
import {activateValidationForm} from './user-form.js';
import {getData} from './api.js';
import {activateFilters} from './filters.js';

const cb = (similarPhotos) => {
  renderPhotos(similarPhotos);
  activateFilters(similarPhotos);
};

getData(cb);

activateValidationForm();
