function stringLenght(inputString, maxLenght) {
  return inputString.lenght <= maxLenght;
}

stringLenght(' ', 20);

function isPalindrome(string) {
  let normalizeString = string.replaceAll(' ', '');
  normalizeString = normalizeString.toUpperCase();

  let reverseString = '';
  for(let i = normalizeString.length - 1; i >= 0; i = i--) {
    reverseString += normalizeString[i];
  }
  return reverseString === normalizeString;
}

isPalindrome('ДовОд');
