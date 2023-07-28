const ALERT_SHOW_TIME = 5000;

//генератор случайного числа в диапазоне
const getRandomInteger = (minNumber, maxNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

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
const IdGeneratorFromRange = (minNumber, maxNumber) => {
  const previousValues = [];

  let currentValue = getRandomInteger(minNumber, maxNumber);

  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(minNumber, maxNumber);
  }
  previousValues.push(currentValue);

  return currentValue;
};

//удаление класса deleteClass у элемента с классом classElement
const removeClass = (classElement, deleteClass) => {
  const element = document.querySelector(classElement);
  element.classList.remove(deleteClass);
};

//добавление класса newClass к элементу с классом classElement
const addClass = (classElement, newClass) => {
  const element = document.querySelector(classElement);
  element.classList.add(newClass);
};

//функция получения количества лайков у миниатюры
const getCountLikesAboutThumbnail = (thumbnail) => thumbnail.querySelector('.picture__likes').textContent;

//функция получения количества комментариев у миниатюры
const getCountCommentsAboutThumbnail = (thumbnail) => thumbnail.querySelector('.picture__comments').textContent;

//функция получения описания миниатюры
const getDescriptionAboutThumbnail = (thumbnail) => thumbnail.querySelector('.picture__img').alt;

//проверка нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//формирование окна сообщения
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '100px';
  alertContainer.style.right = '0';
  alertContainer.style.width = '700px';
  alertContainer.style.height = '100px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.padding = '20px 5px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.border = '2px solid #ffffff';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator, IdGeneratorFromRange, removeClass, addClass,
  getCountLikesAboutThumbnail, getCountCommentsAboutThumbnail,getDescriptionAboutThumbnail,isEscapeKey, showAlert, debounce};
