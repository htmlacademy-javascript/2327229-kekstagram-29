import {thumbnailRenderingDefault, thumbnailRenderingRandom, thumbnailRenderingDiscussion} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {addImageHandler} from './form-work.js';
import {setDefaultClick, setRandomClick, setDiscussedClick, openFilterBox} from './filter-photo.js';
import {debounce,showAlert} from './util.js';
import './new-photo.js';

const RERENDER_DELAY = 500;
const buttonImageLoading = document.querySelector('.img-upload__input'); //кнопка загрузки изображения

getData()
  .then((photos) => {
    thumbnailRenderingDefault(photos);
    openFilterBox();
    setDefaultClick(debounce(
      () => thumbnailRenderingDefault(photos),
      RERENDER_DELAY,
    ));
    setRandomClick(debounce(
      () => thumbnailRenderingRandom(photos),
      RERENDER_DELAY
    ));
    setDiscussedClick(debounce(
      () => thumbnailRenderingDiscussion(photos),
      RERENDER_DELAY
    ));
  })
  .catch((err) => {
    showAlert(err.message);
  });


buttonImageLoading.addEventListener('change', addImageHandler); //добавление обработчика клика по кнопке загрузки изображения
