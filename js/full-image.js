import {removeClass, addClass, getImageAboutThumbnail, getCountLikesAboutThumbnail, getCountCommentsAboutThumbnail,
  getDescriptionAboutThumbnail, isEscapeKey} from './util.js';

const commentsList = document.querySelector('.social__comments');
const countShowedComments = document.querySelector('.count-showed-comments'); //место где отображается количество отображенных комментариев
const buttonClose = document.querySelector('.big-picture__cancel');
const COUNT_COMMENTS_DEFAULT = 5;

function getCommentsLoader(){
  return document.querySelector('.comments-loader');
}


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
    builderBigPictures(item, comments);

    document.addEventListener('keydown', onDocumentKeydown);
  });
}

//Обработчик закрытия окна полноразмерного изображения
function addClickCloseHandler() {
  addClass('.big-picture', 'hidden');
  removeClass('body', 'modal-open');
  commentsList.innerHTML = '';

  const commentsLoader = deleteHendlers();
  commentsList.after(commentsLoader);
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

function deleteHendlers(){
  const commentsLoader = getCommentsLoader();

  const newCommentsLoader = commentsLoader.cloneNode(true);
  commentsLoader.remove();
  return newCommentsLoader;
}

//конструктор полноразмерного окна фотографии
function builderBigPictures(item, comments){
  const bigPicturesImage = document.querySelector('.big-picture__img');
  bigPicturesImage.querySelector('img').src = getImageAboutThumbnail(item);

  const bigPicturesLikes = document.querySelector('.likes-count');
  bigPicturesLikes.textContent = getCountLikesAboutThumbnail(item);

  const bigPicturesDescription = document.querySelector('.social__caption');
  bigPicturesDescription.textContent = getDescriptionAboutThumbnail(item);

  //обработка клика по кнопке "загрузить ещё"
  const commentsLoader = getCommentsLoader();
  const loadingComments = () => clickLoadCommentHandler(comments);
  commentsLoader.addEventListener('click', loadingComments);

  const bigPicturesComments = document.querySelector('.comments-count');
  const countComments = getCountCommentsAboutThumbnail(item);
  bigPicturesComments.textContent = countComments;
  //если количество комментариев меньше 5, то выводится иx количество, иначе 5
  //условие отрабатывает отображение тех комментариев, которые видны при открытии поста
  if(countComments <= COUNT_COMMENTS_DEFAULT) {
    countShowedComments.textContent = countComments;
    for(let i = 0; i < countComments; i++){
      renderComments(createComment(comments[i]));
    }
    commentsLoader.classList.add('hidden');
  } else {
    countShowedComments.textContent = COUNT_COMMENTS_DEFAULT;
    for(let i = 0; i < COUNT_COMMENTS_DEFAULT; i++){
      renderComments(createComment(comments[i]));
    }
  }

  //обработка клика закрытия полноразмерного окна
  buttonClose.addEventListener('click', addClickCloseHandler);
}

//функция загрузки ещё комментариев
function clickLoadCommentHandler(comments){
  const commentsLength = comments.length;
  let indexElementArrayComments = 0;

  const displayedComments = document.querySelector('.count-showed-comments').textContent;

  if(commentsLength >= Number(displayedComments)){ //нужно вместо этой константы поставить число, которое уже отображено
    indexElementArrayComments = Number(displayedComments) - 1;
  } else {
    indexElementArrayComments = commentsLength;
  }

  if((indexElementArrayComments + 1) === commentsLength || commentsLength <= 5) {
    //
  } else {

    if(indexElementArrayComments + 1 < commentsLength && commentsLength - indexElementArrayComments - 1 <= COUNT_COMMENTS_DEFAULT){
      //если еще не весь список отображен и количество неотображенных комментариев меньше или = 5, то
      for(let i = indexElementArrayComments + 1; i < commentsLength; i++){
        renderComments(createComment(comments[i]));
      }
      countShowedComments.textContent = commentsLength;

      indexElementArrayComments = commentsLength;

      const commentsLoader = getCommentsLoader();
      commentsLoader.classList.add('hidden');
    }

    if(indexElementArrayComments + 1 < commentsLength && commentsLength - indexElementArrayComments - 1 > COUNT_COMMENTS_DEFAULT){
      //если еще не весь список отображен и количество неотображенных комментариев больше 5, то
      for(let i = indexElementArrayComments + 1; i <= indexElementArrayComments + COUNT_COMMENTS_DEFAULT; i++){
        renderComments(createComment(comments[i]));
      }
      indexElementArrayComments += 5;
      countShowedComments.textContent = Number(countShowedComments.textContent) + COUNT_COMMENTS_DEFAULT;
    }
  }
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

//функция по отображению комментария
function renderComments(comment) {
  commentsList.append(comment);
}

export {addClickOpenHandler};
