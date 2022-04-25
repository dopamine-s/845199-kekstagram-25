import {isEscapeKey, checkMaxLength} from './util.js';
import {body} from './fullsize-modal.js';
import {activateEffects, deactivateEffects} from './effects.js';
import {sendData} from './api.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP_VALUE = 25;
const DEFAULT_VALUE = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const SPLITTER = ' ';
const MAX_HASHTAGS_AMOUNT = 5;

const imagePicturePreview = document.querySelector('.img-upload__preview img');
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const closeButtonUploadForm = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagsValidationErrorMessage = 'Хэштег начинается с решетки<br/>Хэштег содержит только буквы и цифры (без пробелов)<br/>Минимальное число символов - 1, Максимальное - 19<br/>Хэштеги разделяются одним пробелом';
const hashtagsCountValidationErrorMessage = 'Не более 5 хэштегов, разделенных пробелами';
const hashtagsRepeatValidationErrorMessage = 'Хэштеги не должны повторяться';
const textDescriptionValidationErrorMessage = 'Не более 140 знаков';

const activateValidationForm = () => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__text-container',
    errorTextParent: 'img-upload__text-container',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error',
  });

  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imagePicturePreview.src = URL.createObjectURL(file);
    }
  });

  function lowerScale () {
    if (parseInt(scaleControlValue.value, 10) > MIN_SCALE_VALUE) {
      scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - SCALE_STEP_VALUE} %`;
      imagePicturePreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
    }
  }

  function increaseScale () {
    if (parseInt(scaleControlValue.value, 10) < MAX_SCALE_VALUE) {
      scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + SCALE_STEP_VALUE} %`;
      imagePicturePreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
    }
  }

  const onFormEscKeydown = (evt) => {
    const isHashtagsInputFocused = hashtags === document.activeElement;
    const isTextDescriptionFocused = textDescription === document.activeElement;
    if (isEscapeKey(evt) && !isHashtagsInputFocused && !isTextDescriptionFocused) {
      evt.preventDefault();
      onFormCloseUpload();
    }
  };

  function onFormOpenUpload () {
    uploadForm.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onFormEscKeydown);
    scaleControlValue.value = `${DEFAULT_VALUE} %`;
    scaleControlSmaller.addEventListener('click', lowerScale);
    scaleControlBigger.addEventListener('click', increaseScale);

    activateEffects();
  }

  function onFormCloseUpload () {
    uploadForm.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onFormEscKeydown);
    scaleControlSmaller.removeEventListener('click', lowerScale);
    scaleControlBigger.removeEventListener('click', increaseScale);
    uploadFile.value = '';
    hashtags.value = '';
    textDescription.value = '';

    pristine.reset();
    deactivateEffects();
  }

  uploadFile.addEventListener('change', onFormOpenUpload);

  closeButtonUploadForm.addEventListener('click', () => {
    onFormCloseUpload ();
  });

  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Сохраняю...';
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };

  function setUserFormSubmit(onSuccess) {

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const isValid = pristine.validate();
      if (isValid) {
        blockSubmitButton();
        sendData(
          () => {
            onSuccess();
            unblockSubmitButton();
          },
          () => {
            unblockSubmitButton();
            onFormCloseUpload();
          },
          new FormData(evt.target),
        );
      }
    });
  }

  setUserFormSubmit(onFormCloseUpload);

  function validateSingleHashtag(value) {
    const resultData = value.split(SPLITTER);
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    const result = resultData.every((item) => re.test(item));

    return value !== '' ? result : true;
  }

  pristine.addValidator(
    hashtags,
    validateSingleHashtag,
    hashtagsValidationErrorMessage
  );

  function validateHashtagsRepeat(value) {
    const resultData = value.toLowerCase().split(SPLITTER);
    const uniqHashtags = [];
    for (const resultDataElement of resultData) {
      if (uniqHashtags.includes(resultDataElement)) {
        return false;
      }

      uniqHashtags.push(resultDataElement);
    }
    return resultData;
  }

  pristine.addValidator(
    hashtags,
    validateHashtagsRepeat,
    hashtagsRepeatValidationErrorMessage
  );

  function validateHashtagsCount(value) {
    const result = value.split(SPLITTER);

    return result.length <= MAX_HASHTAGS_AMOUNT;
  }

  pristine.addValidator(
    hashtags,
    validateHashtagsCount,
    hashtagsCountValidationErrorMessage
  );

  function validateTextDescription(value) {
    return value !=='' ? checkMaxLength(value) : true;
  }

  pristine.addValidator(
    textDescription,
    validateTextDescription,
    textDescriptionValidationErrorMessage
  );
};

export {activateValidationForm, hashtags, textDescription};
