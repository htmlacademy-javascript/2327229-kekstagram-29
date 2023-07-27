const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const previewOriginal = document.querySelector('.effects__preview--none');
const previewChrom = document.querySelector('.effects__preview--chrome');
const previewSepia = document.querySelector('.effects__preview--sepia');
const previewMarvin = document.querySelector('.effects__preview--marvin');
const previewPhobos = document.querySelector('.effects__preview--phobos');
const previewHeat = document.querySelector('.effects__preview--heat');


fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    previewOriginal.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    previewChrom.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    previewSepia.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    previewMarvin.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    previewPhobos.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    previewHeat.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});
