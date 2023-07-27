const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');

function openFilterBox() {
  const filter = document.querySelector('.img-filters');
  filter.classList.remove('img-filters--inactive');
}

function setDefaultClick(cb) {
  buttonFilterDefault.addEventListener('click', () => {
    buttonFilterDefault.classList.add('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    cb();
  });
}

function setRandomClick(cb) {
  buttonFilterRandom.addEventListener('click', () => {
    buttonFilterRandom.classList.add('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    cb();
  });
}

function setDiscussedClick(cb) {
  buttonFilterDiscussed.addEventListener('click', () => {
    buttonFilterDiscussed.classList.add('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    cb();
  });
}

export {setDefaultClick, setRandomClick, setDiscussedClick, openFilterBox};
