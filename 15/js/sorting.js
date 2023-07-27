//сортировка по умолчанию
function sortedDefault(array){
  return array;
}

//сортирвка рандомные 10 фото
function sortRandom(array){
  const newArray = [];
  while(newArray.length !== 10){
    const elem = arrayRandElement(array);
    if(newArray.indexOf(elem) === -1){
      newArray.push(elem);
    }
  }
  return newArray;
}

//сортировка по убыванию количества комментариев
function sortDiscussion(array){
  return array
    .slice()
    .sort(compareComments);
}

//получение случайного элемента из массива
function arrayRandElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

//сравнение по количеству комментариев
function compareComments(arrayElementA, arrayElementB){
  const countCommentsA = arrayElementA.comments.length;
  const countCommentsB = arrayElementB.comments.length;

  if(countCommentsA < countCommentsB) {
    return 1;
  }
  if(countCommentsA === countCommentsB) {
    return 0;
  }
  if(countCommentsA > countCommentsB) {
    return -1;
  }
}

export {sortedDefault, sortRandom, sortDiscussion};
