import {thumbnailRenderingDefault, thumbnailRenderingRandom, thumbnailRenderingDiscussion} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {windowNewImageHandlers} from './form-work.js';
import {setDefaultClick, setRandomClick, setDiscussedClick, openFilterBox} from './filter-photo.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

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
  });

windowNewImageHandlers();
