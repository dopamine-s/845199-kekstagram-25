import {isEscapeKey} from './util.js';
import {createComments, removeComments} from './comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createModal = (url, likes, description) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const onModalClose = () => {
  closeUserModal();
};

function openUserModal (url, likes, comments, description) {
  createModal(url, likes, description);
  createComments(comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', onModalClose);
}

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  removeComments();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

export {openUserModal, body};
