//модуль для работы с формой
import {removeClass, addClass, isEscapeKey} from './util.js';
import {checkForm, resetPristine} from './form-validation.js';
import {filterHandlers, defaultSettings} from './form-slider.js';
import {controlBiggerHandler, controlSmallerHandler} from './form-scale.js';
import {sendData} from './api.js';
import {displaySuccessMessage, displayErrorMessage} from './message-boxes.js';

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

//обрабработчик по закрытию окна загрузки изображения
const closeWindowLoadingImageHandler = () => {
  addClass('.img-upload__overlay', 'hidden');
  removeClass('body', 'modal-open');
  buttonImageLoading.value = null;
  inputTextHashtags.value = '';
  textDescription.value = '';
  defaultSettings(); //сброс настроек слайдера
  resetPristine();

  radioButtonOriginal.checked = true;
  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(1.0)';
  imagePreview.style.filter = 'none';

  document.removeEventListener('keydown', onDocumentKeydown);
};

//обрабочкик клика по Esc при закрытии окна
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindowLoadingImageHandler();
  }
}

//обработчик проверки формы перед отправкой
const buttonSubmitHandler = () => {
  if (checkForm()){
    buttonSubmitNewImage.removeAttribute('disabled');
  } else {
    buttonSubmitNewImage.setAttribute('disabled', true);
  }
};

const blockSubmitButton = () => {
  buttonSubmitNewImage.disabled = true;
  buttonSubmitNewImage.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  buttonSubmitNewImage.disabled = false;
  buttonSubmitNewImage.textContent = SubmitButtonText.IDLE;
};

//функция, обрабатывающая отправку формы
const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = checkForm();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(resetPristine)
        .then(closeWindowLoadingImageHandler)
        .then(displaySuccessMessage)
        .catch(() => {
          displayErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

const windowNewImageHandlers = () => {
  buttonCloseWindowLoadingImage.addEventListener('click', closeWindowLoadingImageHandler); //добавдение обработчика клика по кнопке закрытия окна добавления изображения

  inputTextHashtags.addEventListener('input', buttonSubmitHandler); //добавление обработчика дизейбла кнопки при невалидном хэштеге
  textDescription.addEventListener('input', buttonSubmitHandler); //добавление обработчика дизейбла кнопки при невалидном комментарии

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

  filterHandlers(); //обработчик добавления фильтров

  setUserFormSubmit(); //обработчик отправки формы
};

//обработчик добавления изображения
const addImageHandler = () => {
  removeClass('.img-upload__overlay', 'hidden');
  addClass('body', 'modal-open');

  windowNewImageHandlers();

  document.addEventListener('keydown', onDocumentKeydown);
};

export {addImageHandler, onDocumentKeydown};
