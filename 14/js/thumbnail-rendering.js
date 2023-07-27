import {addClickOpenHandler} from './full-image.js';
import {sortedDefault, sortRandom, sortDiscussion} from './sorting.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const newItemThumbnail = thumbnailTemplate.querySelector('.picture');

const thumbnailList = document.querySelector('.pictures');

//получение информации о миниатюре
function getThumbnail({ url, description, likes, comments }) {
  const thumbnail = newItemThumbnail.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
}

//отрисовка миниатюр по умолчанию
function thumbnailRenderingDefault(photos) {
  thumbnailRendering(sortedDefault(photos));
}

//отрисовка миниатюр по умолчанию
function thumbnailRenderingRandom(photos) {
  thumbnailRendering(sortRandom(photos));
}

//отрисовка миниатюр по умолчанию
function thumbnailRenderingDiscussion(photos) {
  const photosSorting = sortDiscussion(photos);
  thumbnailRendering(photosSorting);
}

//отрисовка миниатюры
function thumbnailRendering(photosSorting) { //передаем сюда отсортированный массив и его отрисовываем
  const thumbnailElements = document.querySelector('.pictures');
  const picElement = thumbnailElements.children;
  for(let i = (picElement.length - 1); i >= 2; i--){
    picElement[i].remove();
  }

  const fragment = document.createDocumentFragment();
  photosSorting.forEach((photo) => {
    const thumbnail = getThumbnail(photo);
    fragment.append(thumbnail);
    addClickOpenHandler(thumbnail, photo.comments); //обработчик клика по миниатюре из другого модуля
  });
  thumbnailList.append(fragment);
}


export {thumbnailRenderingDefault, thumbnailRenderingRandom, thumbnailRenderingDiscussion};
