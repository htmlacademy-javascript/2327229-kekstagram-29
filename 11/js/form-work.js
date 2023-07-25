import {removeClass, addClass, isEscapeKey} from './util.js';
import {checkForm} from './form-validation.js';

const buttonImageLoading = document.querySelector('.img-upload__input'); //кнопка загрузки изображения
const buttonCloseWindowLoadingImage = document.querySelector('.img-upload__cancel'); //кнопка закрытия окна загрузки изображения
const inputTextHashtags = document.querySelector('.text__hashtags'); //поле ввода хэштегов
const textDescription = document.querySelector('.text__description'); //поле ввода описания фотографии (комментария)
const radioButtonOriginal = document.querySelector('#effect-none');
const scaleControl = document.querySelector('.scale__control--value');


function windowNewImageHandlers(){
  buttonImageLoading.addEventListener('change', addImageHandler); //добавление обработчика клика по кнопке загрузки изображения
  buttonCloseWindowLoadingImage.addEventListener('click', closeWindowLoadingImageHandler); //добавдение обработчика клика по кнопке закрытия окна добавления изображения
  inputTextHashtags.addEventListener('input', checkForm); //добавление обработчкика на проверку корректности заполнения формы

  inputTextHashtags.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });
  inputTextHashtags.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
  textDescription.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });
  textDescription.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

//обработчик добавления изображения
function addImageHandler(){
  removeClass('.img-upload__overlay', 'hidden');
  addClass('body', 'modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

//обрабработчик по закрытию окна загрузки изображения
function closeWindowLoadingImageHandler(){
  addClass('.img-upload__overlay', 'hidden');
  removeClass('body', 'modal-open');
  buttonImageLoading.value = null;
  inputTextHashtags.value = '';
  textDescription.value = '';
  radioButtonOriginal.setAttribute('chacked', true);
  scaleControl.value = '100%';

  document.removeEventListener('keydown', onDocumentKeydown);
}

//обрабочкик клика по Esc при закрытии окна
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindowLoadingImageHandler();
  }
}

export {windowNewImageHandlers};
