const scaleControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

//получение числового значения масштаба картинки
const getNumberValueScale = () => {
  let numberValue = '';
  for (let i = 0; i < scaleControl.value.length - 1; i++){
    numberValue += scaleControl.value[i];
  }
  numberValue = Number(numberValue);
  return numberValue;
};

//обработчик кнопки уменьшения масштаба изображения
const controlSmallerHandler = () => {
  let numberScale = getNumberValueScale();
  if(numberScale >= 50){
    numberScale -= 25;
    imagePreview.style.transform = `scale(0.${numberScale})`;
    numberScale += '%';
    scaleControl.value = numberScale;
  }
};

//обработчик кнопки увеличения масштаба изображения
const controlBiggerHandler = () => {
  let numberScale = getNumberValueScale();
  if(numberScale <= 75){
    numberScale += 25;
    if(numberScale === 100){
      imagePreview.style.transform = 'scale(1.0)';
    } else {
      imagePreview.style.transform = `scale(0.${numberScale})`;
    }
    numberScale += '%';
    scaleControl.value = numberScale;
  }
};

export {controlBiggerHandler, controlSmallerHandler};
