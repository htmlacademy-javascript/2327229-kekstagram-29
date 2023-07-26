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

//получает из строки времени часы
function getAllocationHours(time) {
  let hours = '';
  let i = 0;
  while(time[i] !== ':') {
    hours += time[i];
    i++;
  }
  if(+hours[0] === 0){
    return +hours[1];
  }
  if(hours.length === 1){
    return +hours[0];
  }
  return +(hours[0] + hours[1]);
}

//получает из строки времени минуты
function getAllocationMinutes(time) {
  let minutes = '';
  let i = 0;
  while(time[i] !== ':') {
    i++;
  }
  i++;

  if(+time[i] !== 0) {
    minutes += time[i];
  }

  if(time[i + 1] !== undefined) {
    minutes += time[i + 1];
  }

  return +minutes;
}

//проверяет, укладывается ли встреча в рабочее время
function checkMeetingIsOnDay(timeStart, timeEnd, startMeeting, durationMeeting) {
  const hourStart = getAllocationHours(timeStart);
  const minuteStart = getAllocationMinutes(timeStart);
  const hourEnd = getAllocationHours(timeEnd);
  const minuteEnd = getAllocationMinutes(timeEnd);
  const hourStartMeeting = getAllocationHours(startMeeting);
  const minuteStartMeeting = getAllocationMinutes(startMeeting);
  const hourEndMeeting = hourStartMeeting + Math.floor(durationMeeting / 60);
  const minuteEndMeeting = minuteStartMeeting + (durationMeeting - Math.floor(durationMeeting / 60) * 60);

  if(hourStartMeeting >= hourStart && hourStartMeeting <= hourEnd) {
    if(hourStartMeeting === hourStart && minuteStart > minuteStartMeeting) {
      return false;
    } else {
      if (hourEndMeeting > hourEnd) {
        return false;
      } else {
        if(hourEndMeeting === hourEnd && minuteEnd < minuteEndMeeting) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}

checkMeetingIsOnDay('08:00', '17:30', '14:00', 90); // true
checkMeetingIsOnDay('8:0', '10:0', '8:0', 120); // true
checkMeetingIsOnDay('08:00', '14:30', '14:00', 90); // false
checkMeetingIsOnDay('14:00', '17:30', '08:0', 90); // false
checkMeetingIsOnDay('8:00', '17:30', '08:00', 900); // false
