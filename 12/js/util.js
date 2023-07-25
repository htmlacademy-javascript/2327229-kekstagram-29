//генератор случайного числа в диапазоне
function getRandomInteger (minNumber, maxNumber) {
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//генератор id по порядку чисел
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//генератор id из диапазона
function IdGeneratorFromRange (minNumber, maxNumber) {
  const previousValues = [];

  let currentValue = getRandomInteger(minNumber, maxNumber);

  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(minNumber, maxNumber);
  }
  previousValues.push(currentValue);

  return currentValue;
}

//удаление класса deleteClass у элемента с классом classElement
function removeClass(classElement, deleteClass) {
  const element = document.querySelector(classElement);
  element.classList.remove(deleteClass);
}

//добавление класса newClass к элементу с классом classElement
function addClass(classElement, newClass) {
  const element = document.querySelector(classElement);
  element.classList.add(newClass);
}

//функция получения картинки миниатюры
function getImageAboutThumbnail(thumbnail) {
  return thumbnail.querySelector('.picture__img').src;
}

//функция получения количества лайков у миниатюры
function getCountLikesAboutThumbnail(thumbnail) {
  return thumbnail.querySelector('.picture__likes').textContent;
}

//функция получения количества комментариев у миниатюры
function getCountCommentsAboutThumbnail(thumbnail) {
  return thumbnail.querySelector('.picture__comments').textContent;
}

//функция получения описания миниатюры
function getDescriptionAboutThumbnail(thumbnail) {
  return thumbnail.querySelector('.picture__img').alt;
}

//проверка нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, createIdGenerator, IdGeneratorFromRange, removeClass, addClass, getImageAboutThumbnail,
  getCountLikesAboutThumbnail, getCountCommentsAboutThumbnail,getDescriptionAboutThumbnail,isEscapeKey};
