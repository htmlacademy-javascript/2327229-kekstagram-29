//модуль для работы с фильтром фотографий других пользователей
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');

const openFilterBox = () => {
  const filter = document.querySelector('.img-filters');
  filter.classList.remove('img-filters--inactive');
};

const setDefaultClick = (cb) => {
  buttonFilterDefault.addEventListener('click', () => {
    buttonFilterDefault.classList.add('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    cb();
  });
};

const setRandomClick = (cb) => {
  buttonFilterRandom.addEventListener('click', () => {
    buttonFilterRandom.classList.add('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    cb();
  });
};

const setDiscussedClick = (cb) => {
  buttonFilterDiscussed.addEventListener('click', () => {
    buttonFilterDiscussed.classList.add('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    cb();
  });
};

export {setDefaultClick, setRandomClick, setDiscussedClick, openFilterBox};
