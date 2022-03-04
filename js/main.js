/**
 * функция возвращает случайное число из диапазона
 * @param {int} min - минимальное число в диапазоне
 * @param {int} max - максимальное число в диапазоне
 * @returns {int} - целое случайное число
 */
function getRandomInRange(min, max) {
  if (min < 0 || max < 0 ) {
    throw 'ошибочное значение переменной';
  }
  if (min > max) {
    max = max + min;
    min = max - min;
    max = max - min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInRange();

/**
 * функция проверяет строку на допустимую длину
 * @param {string} str - произвольная строка
 * @param {int} maxLength - допустимая длина
 * @returns {Boolean} - Булево значение
 */
function checkMaxLength(str, maxLength) {
  return str.length <= maxLength;
}

checkMaxLength();
