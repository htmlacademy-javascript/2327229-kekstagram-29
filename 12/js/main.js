import {thumbnailRendering} from './thumbnail-rendering.js';
import {createSimilarPhotos} from './data.js';
import {windowNewImageHandlers} from './form-work.js';

thumbnailRendering(createSimilarPhotos());
windowNewImageHandlers();
