import {showAlert} from './util.js';
import {openErrorMessage, openSuccessMessage} from './messages.js';

const URL = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(`${URL}/data`)
    .then((response) => response.json())
    .then((similarPhotos) => {
      if (similarPhotos.length) {
        onSuccess(similarPhotos);
      } else {
        showAlert('Ошибка загрузки данных');
      }
    })
    .catch(() => {
      showAlert('Ошибка загрузки изображений');
    });
};

const sendData = (onSuccess, onFail, FormData) => {
  fetch(
    URL, {
      method: 'POST',
      body: FormData,
    })

    .then((response) => {
      if (response.ok) {
        onSuccess(openSuccessMessage());
      } else {
        onFail(openErrorMessage());
      }
    })
    .catch(() => {
      onFail(openErrorMessage());
    });
};

export {getData, sendData};
