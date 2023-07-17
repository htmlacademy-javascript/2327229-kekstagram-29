//отрисовка миниатюр
const thumbnailTemplate = document.querySelector('#picture').content;
const newItemThumbnail = thumbnailTemplate.querySelector('.picture');

const thumbnailList = document.querySelector('.pictures');

function getThumbnail({ url, description, likes, comments }) {
  const thumbnail = newItemThumbnail.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
}

function thumbnailRendering(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = getThumbnail(photo);
    fragment.append(thumbnail);
  });
  thumbnailList.append(fragment);
}

export {thumbnailRendering};
