//Функция для проверки длины строки
function stringLenght(inputString, maxLenght) {
  return inputString.lenght <= maxLenght;
}

stringLenght('', 20);

//Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  let normalizeString = string.replaceAll(' ', '');
  normalizeString = normalizeString.toUpperCase();

  let reverseString = '';
  for(let i = normalizeString.length - 1; i >= 0; i = i - 1) {
    reverseString += normalizeString[i];
  }
  return reverseString === normalizeString;
}

isPalindrome('ДовОд');
