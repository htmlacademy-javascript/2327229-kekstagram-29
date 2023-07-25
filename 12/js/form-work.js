import {removeClass, addClass, isEscapeKey} from './util.js';
import {checkForm} from './form-validation.js';
import {filterHandlers, defaultSettings} from './form-slider.js';
import {controlBiggerHandler, controlSmallerHandler} from './form-scale.js';

const buttonImageLoading = document.querySelector('.img-upload__input'); //кнопка загрузки изображения
const buttonCloseWindowLoadingImage = document.querySelector('.img-upload__cancel'); //кнопка закрытия окна загрузки изображения
const inputTextHashtags = document.querySelector('.text__hashtags'); //поле ввода хэштегов
const textDescription = document.querySelector('.text__description'); //поле ввода описания фотографии (комментария)

const scaleControl = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const radioButtonOriginal = document.querySelector('#effect-none');

function windowNewImageHandlers(){
  buttonImageLoading.addEventListener('change', addImageHandler); //добавление обработчика клика по кнопке загрузки изображения
  buttonCloseWindowLoadingImage.addEventListener('click', closeWindowLoadingImageHandler); //добавдение обработчика клика по кнопке закрытия окна добавления изображения
  inputTextHashtags.addEventListener('input', checkForm); //добавление обработчкика на проверку корректности заполнения формы

  //удаление обработчика нажатия Esc при фокусе на полях ввода хэштега или комментария
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

  buttonScaleControlSmaller.addEventListener('click', controlSmallerHandler);
  buttonScaleControlBigger.addEventListener('click', controlBiggerHandler);

  filterHandlers();
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
  defaultSettings(); //сброс настроек слайдера

  radioButtonOriginal.checked = true;
  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(1.0)';
  imagePreview.style.filter = 'none';

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
