import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');

const getFullsizeModal = (url, likes, comments, description) => {
  const commentsLength = comments.length;
  let commentsCounter = 5;

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  const showCommentsCount = () => {
    if (commentsLength >= commentsCounter) {
      socialCommentCount.innerHTML = `${commentsCounter} из <span class="comments-count">${commentsLength}</span> комментариев`;
    } else {
      socialCommentCount.innerHTML = `${commentsLength} из <span class="comments-count">${commentsLength}</span> комментариев`;
    }
  };

  const updateCommentsCounterValue = () => {
    const commentsRemainder = commentsLength - commentsCounter;
    if (commentsRemainder >= 5) {
      commentsCounter = commentsCounter + 5;
    } else {
      commentsCounter =  commentsCounter + commentsRemainder;
    }
  };

  const showCommentsLoader = () => {
    if (commentsLength <= commentsCounter) {
      socialCommentsLoader.classList.add('hidden');
    } else {
      socialCommentsLoader.classList.remove('hidden');
    }
  };

  showCommentsCount ();
  showCommentsLoader ();

  const fragmentWithComments = createFragmentWithComments(comments);

  socialCommentsList.innerHTML = '';
  socialCommentsList.appendChild(fragmentWithComments);
  const socialComments = socialCommentsList.querySelectorAll('.social__comment');

  const setCommentsVisibility = () => {
    for (let i = 0; i < commentsLength; i++) {
      if (i > commentsCounter - 1) {
        socialComments[i].classList.add('hidden');
      } else {
        socialComments[i].classList.remove('hidden');
      }
    }
  };

  setCommentsVisibility(commentsLength, commentsCounter, socialComments);

  socialCommentsLoader.addEventListener('click', () => onSocialCommentsLoaderClick(updateCommentsCounterValue, showCommentsCount, showCommentsLoader, setCommentsVisibility));
};

function createFragmentWithComments (comments) {
  const fragment = document.createDocumentFragment();

  comments.forEach(({avatar, message, name}) => {
    const socialCommentsItem = document.createElement('li');

    socialCommentsItem.classList.add('social__comment');

    const socialCommentsImage = document.createElement('img');

    socialCommentsImage.classList.add('social__picture');
    socialCommentsImage.src = avatar;
    socialCommentsImage.alt = name;

    socialCommentsItem.appendChild(socialCommentsImage);

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = message;

    socialCommentsItem.appendChild(socialText);

    fragment.appendChild(socialCommentsItem);
  });

  return fragment;
}

function onSocialCommentsLoaderClick (updateCommentsCounterValue, showCommentsCount, showCommentsLoader, setCommentsVisibility) {
  updateCommentsCounterValue();
  showCommentsCount ();
  showCommentsLoader ();
  setCommentsVisibility();
}

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};


function openUserModal () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

export {getFullsizeModal, openUserModal, closeUserModal, closeButton, body};
