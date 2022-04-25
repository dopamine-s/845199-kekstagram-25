import {isEscapeKey} from './util.js';
import {hashtags, textDescription} from './user-form.js';

const body = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');
const successUnit = templateSuccess.cloneNode(true);
const successButton = successUnit.querySelector('.success__button');
const errorUnit = templateError.cloneNode(true);
const errorButton = errorUnit.querySelector('.error__button');

const closeSuccessMessage = () => {
  successUnit.classList.add('hidden');

  document.removeEventListener('keydown', onSuccessMessageEscKeyDown);

  successButton.removeEventListener('click', onSuccessButtonClick);
};

function onSuccessMessageEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage ();
  }
}

const onErrorMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage ();
  }
};

const createSuccessMessage = () => {
  body.appendChild(successUnit);
  successUnit.classList.add('hidden');
};

const createErrorMessage = () => {
  body.appendChild(errorUnit);
  errorUnit.classList.add('hidden');
};

createSuccessMessage();
createErrorMessage();

const openSuccessMessage = () => {
  successUnit.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageEscKeyDown);
  hashtags.value = '';
  textDescription.value = '';
  successButton.addEventListener('click', onSuccessButtonClick);

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.contains(successUnit)) {
      successUnit.classList.add('hidden');
    }
  }, {once: true});
};

function closeErrorMessage () {
  errorUnit.classList.add('hidden');
  document.removeEventListener('keydown', onErrorMessageEscKeyDown);
  errorButton.removeEventListener('click', onErrorButtonClick);
}

const openErrorMessage = () => {
  errorUnit.classList.remove('hidden');
  document.addEventListener('keydown', onErrorMessageEscKeyDown);

  errorButton.addEventListener('click', onErrorButtonClick);

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.contains(errorUnit)) {
      errorUnit.classList.add('hidden');
    }
  }, {once: true});
};

function onSuccessButtonClick () {
  closeSuccessMessage ();
}

function onErrorButtonClick () {
  closeErrorMessage ();
}

export{openErrorMessage, openSuccessMessage};
