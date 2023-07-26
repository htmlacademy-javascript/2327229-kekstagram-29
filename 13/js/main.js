import {thumbnailRendering} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {windowNewImageHandlers} from './form-work.js';


getData()
  .then((photos) => {
    thumbnailRendering(photos);
  });

windowNewImageHandlers();
