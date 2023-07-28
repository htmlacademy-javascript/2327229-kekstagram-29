//модуль для показа информайионных сообщений по отправке форы
import {isEscapeKey} from './util.js';
import {onDocumentKeydown} from './form-work.js';

//обработчик закрытия окна сообщения об успехе
const closeSuccessBox = () => {
  const successBox = document.querySelector('.success');
  successBox.remove();

  document.removeEventListener('keydown', onDocumentKeydownSuccess);
};

//обрабочкик клика по Esc при закрытии окна об успехе
function onDocumentKeydownSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessBox();
  }
}

//показ сообщения об успешной загрузки фотографии
const displaySuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const success = successTemplate.querySelector('.success');
  const successMessage = success.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(successMessage);
  document.body.append(fragment);

  const successBox = document.querySelector('.success');
  const buttonSuccess = successBox.querySelector('.success__button');
  buttonSuccess.addEventListener('click', closeSuccessBox); //закрытие окна по кнопке
  document.addEventListener('keydown', onDocumentKeydownSuccess); //закрытие окна по esc
  document.addEventListener('click', (evt) => { //закрытие окна по клику вне блока
    if(evt.target.className !== 'success__inner'){
      successBox.remove();
    }
  });
};

//обработчик закрытия окна об ошибке
const closeErrorBox = () => {
  const errorBox = document.querySelector('.error');
  errorBox.remove();
  document.addEventListener('keydown', onDocumentKeydown); //возвращение обработчика закрытия окна формы по esc

  document.removeEventListener('keydown', onDocumentKeydownError);
};

//обрабочкик клика по Esc при закрытии окна об ошибке
function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorBox();
  }
}

//показ сообщения об ошибке загрузки фотографии
const displayErrorMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydown); //блокировка закрытия окна формы по esc
  const errorTemplate = document.querySelector('#error').content;
  const error = errorTemplate.querySelector('.error');
  const errorMessage = error.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(errorMessage);
  document.body.append(fragment);

  const errorBox = document.querySelector('.error');
  const buttonError = errorBox.querySelector('.error__button');
  buttonError.addEventListener('click', closeErrorBox); //закрытие окна по кнопке
  document.addEventListener('keydown', onDocumentKeydownError); //закрытие окна по esc
  document.addEventListener('click', (evt) => { //закрытие окна по клику вне блока
    if(evt.target.className !== 'error__inner'){
      errorBox.remove();
      document.addEventListener('keydown', onDocumentKeydown); //возвращение обработчика закрытия окна формы по esc
    }
  });
};

export {displaySuccessMessage, displayErrorMessage};
