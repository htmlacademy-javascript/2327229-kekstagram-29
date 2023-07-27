const scaleControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

//обработчик кнопки уменьшения масштаба изображения
function controlSmallerHandler(){
  let numberScale = getNumberValueScale();
  if(numberScale >= 50){
    numberScale -= 25;
    imagePreview.style.transform = `scale(0.${numberScale})`;
    numberScale += '%';
    scaleControl.value = numberScale;
  }
}

//обработчик кнопки увеличения масштаба изображения
function controlBiggerHandler(){
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
}

//получение числового значения масштаба картинки
function getNumberValueScale(){
  let numberValue = '';
  for (let i = 0; i < scaleControl.value.length - 1; i++){
    numberValue += scaleControl.value[i];
  }
  numberValue = Number(numberValue);
  return numberValue;
}

export {controlBiggerHandler, controlSmallerHandler};
