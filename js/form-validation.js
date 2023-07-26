const MAX_COUNT_HASHTAG = 5;
const form = document.querySelector('#upload-select-image');
const inputHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

//проверка формы на валидность
function checkForm() {
  return pristine.validate();
}

//проверка количества хэштегов
function checkCountHashtag(value){
  const hashtag = validateHashtag(value);
  return hashtag.length <= MAX_COUNT_HASHTAG;
}

//проверка уникальности хэштега
function checkUniquessHashtag(value){
  const hashtag = validateHashtag(value);
  const hashtagsUnique = new Set(hashtag.map((tag) => tag.toLowerCase()));
  return hashtagsUnique.size === hashtag.length;
}

//проверка на невалидные символы в хэштеге
function chackRegularExpHashtag(value){
  const hashtag = validateHashtag(value);
  const regexpHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtag.find((tag) => !regexpHashtag.test(tag)) === undefined;
}

function validateHashtag(value){
  value.trim().split(' ').filter((tag) => Boolean(tag.length));
  return value.trim().split(' ').filter((tag) => Boolean(tag.length));
}

pristine.addValidator(
  inputHashtags,
  checkCountHashtag,
  'введено больше 5 хэштегов'
);

pristine.addValidator(
  inputHashtags,
  checkUniquessHashtag,
  'присутствуют повторяющиеся хэштеги'
);

pristine.addValidator(
  inputHashtags,
  chackRegularExpHashtag,
  'был введен невалидный хэштег'
);

export {checkForm};
