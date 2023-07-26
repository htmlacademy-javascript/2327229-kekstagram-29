import {removeClass, addClass, isEscapeKey, showAlert} from './util.js';
import {checkForm} from './form-validation.js';
import {filterHandlers, defaultSettings} from './form-slider.js';
import {controlBiggerHandler, controlSmallerHandler} from './form-scale.js';
import {sendData} from './api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const buttonImageLoading = document.querySelector('.img-upload__input'); //кнопка загрузки изображения
const buttonSubmitNewImage = document.querySelector('.img-upload__submit');
const buttonCloseWindowLoadingImage = document.querySelector('.img-upload__cancel'); //кнопка закрытия окна загрузки изображения
const inputTextHashtags = document.querySelector('.text__hashtags'); //поле ввода хэштегов
const textDescription = document.querySelector('.text__description'); //поле ввода описания фотографии (комментария)

const scaleControl = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const radioButtonOriginal = document.querySelector('#effect-none');
const form = document.querySelector('#upload-select-image');

function windowNewImageHandlers(){
  buttonImageLoading.addEventListener('change', addImageHandler); //добавление обработчика клика по кнопке загрузки изображения
  buttonCloseWindowLoadingImage.addEventListener('click', closeWindowLoadingImageHandler); //добавдение обработчика клика по кнопке закрытия окна добавления изображения

  inputTextHashtags.addEventListener('input', buttonSubmitHandler); //добавление обработчика дизейбла кнопри при невалидной форме

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

  buttonScaleControlSmaller.addEventListener('click', controlSmallerHandler); //добавление обработчика уменьшения масштаба
  buttonScaleControlBigger.addEventListener('click', controlBiggerHandler); //добавление обработчика увеличения масштаба

  filterHandlers(); //обработчик добавления фильтов

  setUserFormSubmit(closeWindowLoadingImageHandler); //обработчик отправки формы
}

//функция, обрабатывающая отправку формы
function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = checkForm();
    if (isValid) {
      blockSubmitButton();
      //document.removeEventListener('keydown', onDocumentKeydown);
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
}

//проверить открытие окна сообщения
//при открытии окна сообщения блокировать esc у окна новой фотки

function blockSubmitButton() {
  buttonSubmitNewImage.disabled = true;
  buttonSubmitNewImage.textContent = SubmitButtonText.SENDING;
}

function unblockSubmitButton() {
  buttonSubmitNewImage.disabled = false;
  buttonSubmitNewImage.textContent = SubmitButtonText.IDLE;
}

//обработчик проверки формы перед отправкой
function buttonSubmitHandler() {
  if (checkForm()){
    buttonSubmitNewImage.removeAttribute('disabled');
  } else {
    buttonSubmitNewImage.setAttribute('disabled', true);
  }
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

export {windowNewImageHandlers, onDocumentKeydown};
