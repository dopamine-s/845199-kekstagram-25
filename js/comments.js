const social = document.querySelector('.social');
const socialCommentsList = social.querySelector('.social__comments');
const socialCommentCount = social.querySelector('.social__comment-count');
const socialCommentsLoader = social.querySelector('.comments-loader');

const MIN_COMMENTS_AMOUNT = 5;

const socialComments = {
  total: [],
  shown: []
};

const createComment = ({avatar, message, name}) => {
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

  return socialCommentsItem;
};

const showCommentsCount = () => {
  socialCommentCount.innerHTML = `${socialComments.shown.length} из <span class="comments-count">${socialComments.total.length}</span> комментариев`;
};

const getNextComments = () => {
  const commentsReminder = socialComments.total.length - socialComments.shown.length;

  return (commentsReminder >= MIN_COMMENTS_AMOUNT
    ? socialComments.total.slice(socialComments.shown.length, socialComments.shown.length + MIN_COMMENTS_AMOUNT)
    : socialComments.total.slice(socialComments.shown.length, socialComments.total.length));
};

const showLoadMoreButton = () => {
  if (socialComments.shown.length < socialComments.total.length) {
    socialCommentsLoader.classList.remove('hidden');
    socialCommentsLoader.addEventListener('click', onLoadMoreCommentsClick);
  } else {
    socialCommentsLoader.classList.add('hidden');
    socialCommentsLoader.removeEventListener('click', onLoadMoreCommentsClick);
  }
};

const addNewComments = (comments) => {
  comments.forEach((comment) => {
    const commentItem = createComment(comment);
    socialCommentsList.appendChild(commentItem);
  });
};

const createComments = (comments) => {
  socialCommentsList.innerHTML = '';

  const shownComments = comments.length > MIN_COMMENTS_AMOUNT ? comments.slice(0, MIN_COMMENTS_AMOUNT) : [...comments];

  socialComments.total = comments;
  socialComments.shown = shownComments;

  addNewComments(shownComments);
  showCommentsCount ();
  showLoadMoreButton ();
};

const removeComments = () => {
  socialComments.total = [];
  socialComments.shown = [];

  socialCommentsLoader.removeEventListener('click', onLoadMoreCommentsClick);
};

function onLoadMoreCommentsClick () {
  const nextComments = getNextComments();
  socialComments.shown = [...socialComments.shown, ...nextComments];

  addNewComments(nextComments);
  showCommentsCount ();
  showLoadMoreButton ();
}

export {createComments, removeComments};
