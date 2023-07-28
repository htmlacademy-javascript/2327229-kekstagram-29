//модуль для работы слйдера фильтров к загружаемой фотографии
const EFFECTS_FILTER = {
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px',
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    units: '',
  },
  default: {
    style: 'none',
    min: 1,
    max: 1,
    step: 1,
    units: '',
  },
};

const radioButtonOriginal = document.querySelector('#effect-none');
const radioButtonChrome = document.querySelector('#effect-chrome');
const radioButtonSerpia = document.querySelector('#effect-sepia');
const radioButtonMarvin = document.querySelector('#effect-marvin');
const radioButtonPhobos = document.querySelector('#effect-phobos');
const radioButtonHeat = document.querySelector('#effect-heat');

const imagePreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const sliderHandler = (filter) => {
  const sliderValue = document.querySelector('.effect-level__value');
  slider.noUiSlider.updateOptions({
    range: {
      min: filter.min,
      max: filter.max
    },
    start: filter.max,
    step: filter.step,
  });
  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    imagePreview.style.filter = `${filter.style}(${sliderValue.value}${filter.units})`;
  });
};

const defaultSettings = () => {
  imgUploadEffectLevel.setAttribute('hidden', true);
  sliderHandler(EFFECTS_FILTER.default);
};

const filterHandlers = () => {
  radioButtonOriginal.addEventListener('click', () => {
    imgUploadEffectLevel.setAttribute('hidden', true);
    imagePreview.style.filter = 'none';
  });

  radioButtonChrome.addEventListener('click', () => {
    imagePreview.style.filter = 'none';
    imgUploadEffectLevel.removeAttribute('hidden');

    sliderHandler(EFFECTS_FILTER.chrome);
  });

  radioButtonSerpia.addEventListener('click', () => {
    imagePreview.style.filter = 'none';
    imgUploadEffectLevel.removeAttribute('hidden');

    sliderHandler(EFFECTS_FILTER.sepia);
  });

  radioButtonMarvin.addEventListener('click', () => {
    imagePreview.style.filter = 'none';
    imgUploadEffectLevel.removeAttribute('hidden');

    sliderHandler(EFFECTS_FILTER.marvin);
  });

  radioButtonPhobos.addEventListener('click', () => {
    imagePreview.style.filter = 'none';
    imgUploadEffectLevel.removeAttribute('hidden');

    sliderHandler(EFFECTS_FILTER.phobos);
  });

  radioButtonHeat.addEventListener('click', () => {
    imagePreview.style.filter = 'none';
    imgUploadEffectLevel.removeAttribute('hidden');

    sliderHandler(EFFECTS_FILTER.heat);
  });
};

export {filterHandlers, defaultSettings};
