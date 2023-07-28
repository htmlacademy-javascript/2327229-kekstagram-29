import {addClickOpenHandler} from './full-image.js';
import {sortedDefault, sortRandom, sortDiscussion} from './sorting.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const newItemThumbnail = thumbnailTemplate.querySelector('.picture');

const thumbnailList = document.querySelector('.pictures');

//получение информации о миниатюре
const getThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = newItemThumbnail.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

//отрисовка миниатюры
const thumbnailRendering = (photosSorting) => {
  const thumbnailElements = document.querySelector('.pictures');
  const picElement = thumbnailElements.children;
  for(let i = (picElement.length - 1); i >= 2; i--){
    picElement[i].remove();
  }

  const fragment = document.createDocumentFragment();
  photosSorting.forEach((photo) => {
    const thumbnail = getThumbnail(photo);
    fragment.append(thumbnail);
    addClickOpenHandler(thumbnail, photo); //обработчик клика по миниатюре из другого модуля
  });
  thumbnailList.append(fragment);
};

//отрисовка миниатюр по умолчанию
const thumbnailRenderingDefault = (photos) => {
  thumbnailRendering(sortedDefault(photos));
};

//отрисовка 10 рандомных миниатюр
const thumbnailRenderingRandom = (photos) => {
  thumbnailRendering(sortRandom(photos));
};

//отрисовка миниатюр по убыванию количества комментариев
const thumbnailRenderingDiscussion = (photos) => {
  const photosSorting = sortDiscussion(photos);
  thumbnailRendering(photosSorting);
};


export {thumbnailRenderingDefault, thumbnailRenderingRandom, thumbnailRenderingDiscussion};
