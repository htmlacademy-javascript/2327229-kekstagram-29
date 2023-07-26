import {isEscapeKey} from './util.js';
import {onDocumentKeydown} from './form-work.js';

//показ сообщения об успешной загрузки фотографии
function displaySuccessMessage(){
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
}

//обработчик закрытия окна сообщения об успехе
function closeSuccessBox(){
  const successBox = document.querySelector('.success');
  successBox.remove();

  document.removeEventListener('keydown', onDocumentKeydownSuccess);
}

//обрабочкик клика по Esc при закрытии окна об успехе
function onDocumentKeydownSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessBox();
  }
}

//показ сообщения об ошибке загрузки фотографии
function displayErrorMessage(){
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
}

//обработчик закрытия окна об ошибке
function closeErrorBox(){
  const errorBox = document.querySelector('.error');
  errorBox.remove();
  document.addEventListener('keydown', onDocumentKeydown); //возвращение обработчика закрытия окна формы по esc

  document.removeEventListener('keydown', onDocumentKeydownError);
}

//обрабочкик клика по Esc при закрытии окна об ошибке
function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorBox();
  }
}

export {displaySuccessMessage, displayErrorMessage};
