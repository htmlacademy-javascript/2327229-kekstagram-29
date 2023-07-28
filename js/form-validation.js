//валидация формы
const MAX_COUNT_HASHTAG = 5;
const form = document.querySelector('#upload-select-image');
const inputHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const resetPristine = () => {
  pristine.reset();
};

//проверка формы на валидность
const checkForm = () => pristine.validate();

const validateHashtag = (value) => {
  value.trim().split(' ').filter((tag) => Boolean(tag.length));
  return value.trim().split(' ').filter((tag) => Boolean(tag.length));
};

//проверка количества хэштегов
const checkCountHashtag = (value) => {
  const hashtag = validateHashtag(value);
  return hashtag.length <= MAX_COUNT_HASHTAG;
};

//проверка уникальности хэштега
const checkUniquessHashtag = (value) => {
  const hashtag = validateHashtag(value);
  const hashtagsUnique = new Set(hashtag.map((tag) => tag.toLowerCase()));
  return hashtagsUnique.size === hashtag.length;
};

//проверка на невалидные символы в хэштеге
const chackRegularExpHashtag = (value) => {
  const hashtag = validateHashtag(value);
  const regexpHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtag.find((tag) => !regexpHashtag.test(tag)) === undefined;
};

//проверка на длину комментария
const checkLengthComment = (value) => value.length <= 140;

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

pristine.addValidator(
  textDescription,
  checkLengthComment,
  'количество символов не должно превышать 140'
);

export {checkForm, resetPristine};
