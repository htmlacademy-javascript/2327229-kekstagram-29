//получение случайного элемента из массива
const arrayRandElement = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

//сравнение по количеству комментариев
const compareComments = (arrayElementA, arrayElementB) => {
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
};

//сортировка по умолчанию
const sortedDefault = (array) => array;

//сортирвка рандомные 10 фото
const sortRandom = (array) => {
  const newArray = [];
  while(newArray.length !== 10){
    const elem = arrayRandElement(array);
    if(newArray.indexOf(elem) === -1){
      newArray.push(elem);
    }
  }
  return newArray;
};

//сортировка по убыванию количества комментариев
const sortDiscussion = (array) => array
  .slice()
  .sort(compareComments);

export {sortedDefault, sortRandom, sortDiscussion};
