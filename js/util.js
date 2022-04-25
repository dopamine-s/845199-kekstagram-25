const ALERT_SHOW_TIME = 5000;

/**
 * функция возвращает случайное число из диапазона
 * @param {int} min - минимальное число в диапазоне
 * @param {int} max - максимальное число в диапазоне
 * @returns {int} - целое случайное число
 */
function getRandomInRange(min, max) {
  if (min < 0 || max < 0 ) { throw 'ошибочное значение переменной';}
  if (min > max) {
    max = max + min;
    min = max - min;
    max = max - min;
  }
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);
  return Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin;
}

/**
 * функция проверяет строку на допустимую длину
 * @param {string} string - произвольная строка
 * @param {int} maxLength - допустимая длина
 * @returns {Boolean} - Булево значение
 */
function checkMaxLength(string = '', maxLength = 140) {
  return string.length <= maxLength;
}

/**
 * функция возвращает случайный элемент из заданного массива
 * @param {elements} - массив
 */
const getRandomArrayElement = (elements) => elements[getRandomInRange(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';


function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomArrayElement, getRandomInRange, isEscapeKey, showAlert, debounce, checkMaxLength};
