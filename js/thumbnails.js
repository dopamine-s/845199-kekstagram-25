import {openUserModal} from './fullsize-modal.js';

const renderPhotos = (similarPhotos) => {
  const templateFragment = document.querySelector('#picture').content; // Находим фрагмент HTML документа с содержимым темплейта
  const templatePicture = templateFragment.querySelector('.picture'); // Находим необходимую часть в фрагменте, которую будем "размножать"
  const fragment = document.createDocumentFragment(); // Создаем временное "хранилище", куда будем "складывать" создаваемые по шаблону картинки
  const picturesList = document.querySelector('.pictures'); // В этот список мы в итоге добавим содержимое временного "хранилища"
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });

  similarPhotos.forEach(({url, likes, comments, description}) => {
    const similarPicture =  templatePicture.cloneNode(true);

    similarPicture.querySelector('.picture__img').src = url;
    similarPicture.querySelector('.picture__likes').textContent = likes;
    similarPicture.querySelector('.picture__comments').textContent = comments.length;

    similarPicture.addEventListener('click', () => {
      openUserModal(url, likes, comments, description);
    });

    fragment.appendChild(similarPicture);
  });

  picturesList.appendChild(fragment);
};

export {renderPhotos};
