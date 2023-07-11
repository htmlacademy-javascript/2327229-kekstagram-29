//генератор случайного числа в диапазоне
function getRandomInteger (minNumber, maxNumber) {
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//генератор id по порядку чисел
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//генератор id из диапазона
function IdGeneratorFromRange (minNumber, maxNumber) {
  const previousValues = [];

  let currentValue = getRandomInteger(minNumber, maxNumber);

  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(minNumber, maxNumber);
  }
  previousValues.push(currentValue);

  return currentValue;
}

export {getRandomInteger, getRandomArrayElement, createIdGenerator, IdGeneratorFromRange};
