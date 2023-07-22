import {removeClass, addClass, getImageAboutThumbnail, getCountLikesAboutThumbnail, getCountCommentsAboutThumbnail,
  getDescriptionAboutThumbnail, isEscapeKey} from './util.js';

const commentsList = document.querySelector('.social__comments');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    addClickCloseHandler();
  }
}

//Обработчик клика по миниатюре
function addClickOpenHandler(item, comments) {
  item.addEventListener('click', () => {
    removeClass('.big-picture', 'hidden');
    addClass('body', 'modal-open');
    addClass('.social__comment-count', 'hidden');
    addClass('.comments-loader', 'hidden');
    builderBigPictures(item, comments);

    document.addEventListener('keydown', onDocumentKeydown);
  });
}

//Обработчик закрытия окна полноразмерного изображения
function addClickCloseHandler() {
  addClass('.big-picture', 'hidden');
  removeClass('body', 'modal-open');
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

//конструктор полноразмерного окна фотографии
function builderBigPictures(item, comments){
  const bigPicturesImage = document.querySelector('.big-picture__img');
  bigPicturesImage.querySelector('img').src = getImageAboutThumbnail(item);

  const bigPicturesLikes = document.querySelector('.likes-count');
  bigPicturesLikes.textContent = getCountLikesAboutThumbnail(item);

  const bigPicturesComments = document.querySelector('.comments-count');
  bigPicturesComments.textContent = getCountCommentsAboutThumbnail(item);

  const bigPicturesDescription = document.querySelector('.social__caption');
  bigPicturesDescription.textContent = getDescriptionAboutThumbnail(item);

  createCommentsList(comments);

  const buttonClose = document.querySelector('.big-picture__cancel');
  buttonClose.addEventListener('click', addClickCloseHandler);
}

//создание элемента-комментария к фотографии
function createComment(comment) {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
}

//функция создания списка комментариев для фото
function createCommentsList(arrayComments) {
  arrayComments.forEach((comment) => {
    const newComment = createComment(comment);
    renderComments(newComment);
  });
}

//функция по отображению комментария
function renderComments(comment) {
  commentsList.append(comment);
}

export {addClickOpenHandler};
