'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Вероника',
  'Тимофей',
  'Иван',
  'Ольга',
  'Платон',
  'Ева',
  'Фёдор',
  'Алиса',
  'Ксения'
];

var commentsList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');
var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// функция генерации случайного целого числа, max и min включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция возвращает случайный элемент массива
var getRandomElementfromArray = function (array) {
  var max = Math.floor(array.length);
  var randomElement = array[Math.floor(Math.random() * max)];

  return randomElement;
};

// функция для создания списка комментариев
var getCommentsArray = function () {
  var comments = [];
  for (var i = 0; i < getRandomIntInclusive(0, 10); i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.svg',
      message: getRandomElementfromArray(MESSAGES),
      name: getRandomElementfromArray(NAMES)
    });
  }
  return comments;
};

// функция создания DOM-элемента на основе JS-объекта
var renderComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var addComments = function () {
  var fragment = document.createDocumentFragment();
  var comments = getCommentsArray();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderComment(comments[i]));
  }
  commentsList.appendChild(fragment);
};

// функция переупорядочивает случайным образом элементы массива
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

// функция для создания массива из 25 сгенерированных JS-объектов
var getPicturesArray = function () {
  var pictures = [];
  var MAX_PICTURES = 25;
  for (var i = 1; i <= MAX_PICTURES; i++) {
    pictures.push({
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: getRandomIntInclusive(15, 200),
      comments: getCommentsArray().length
    });
    shuffle(pictures);
  }
  return pictures;
};

// функция для создания массива из сгенерированных JS-объектов
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var addPictures = function () {
  var fragment = document.createDocumentFragment();
  var pictures = getPicturesArray();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesList.appendChild(fragment);
};

addComments();

addPictures();

// Просмотр загруженных изображений

// заполнение элемента .big-picture информацией из первого элемента массива с данными
var fullPicture = document.querySelector('.big-picture');
var fullPictureClose = fullPicture.querySelector('.big-picture__cancel');

var renderFullPicture = function () {
  fullPicture.querySelector('.big-picture__img').src = fullPicture.url;
  fullPicture.querySelector('.social__likes').textContent = fullPicture.likes;
  fullPicture.querySelector('.comments-count').textContent = fullPicture.comments;
  fullPicture.querySelector('.social__caption').textContent = fullPicture.description;

  return fullPicture;
};

renderFullPicture();

// Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden
fullPicture.querySelector('.social__comment-count').classList.add('hidden');
fullPicture.querySelector('.comments-loader').classList.add('hidden');

// Возможность просмотра любой фотографии в полноразмерном режиме
var thumbnails = picturesList.querySelectorAll('.picture__img');
var fullPhoto = fullPicture.querySelector('img');
var thumbnailLinks = picturesList.querySelectorAll('.picture');

var openFullPhoto = function () {
  fullPicture.classList.remove('hidden');
  document.addEventListener('keydown', onFullPhotoEscPress);
  // Контейнер с фотографиями не прокручивается при скролле
  document.querySelector('body').classList.add('modal-open');
};


var onThumbnailClick = function (thumbnailLink, photo, description) {
  thumbnailLink.addEventListener('click', function (evt) {
    // отменить переход по ссылке
    evt.preventDefault();
    fullPhoto.src = photo;
    fullPhoto.alt = description;
    openFullPhoto();
  });
};

var enlargeThumbnailOnClick = function () {
  for (var i = 0; i < thumbnailLinks.length; i++) {
    onThumbnailClick(thumbnailLinks[i], thumbnails[i].src, thumbnails[i].alt);
  }
};

enlargeThumbnailOnClick();


// Выбранная фотография открывается в полноразмерном режиме при нажатии на клавишу Enter
var onThumbnailEnterPress = function (thumbnailLink, photo, description) {
  thumbnailLink.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      fullPhoto.src = photo;
      fullPhoto.alt = description;
      openFullPhoto();
    }
  });
};

var enlargeThumbnailOnEnter = function () {
  for (var i = 0; i < thumbnailLinks.length; i++) {
    onThumbnailEnterPress(thumbnailLinks[i], thumbnails[i].src, thumbnails[i].alt);
  }
};

enlargeThumbnailOnEnter();

// Закрытие окна полноразмерного просмотра по нажатию клавиши Esc и клике по иконке закрытия
var onFullPhotoEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPhoto();
  }
};

var closeFullPhoto = function () {
  fullPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

fullPictureClose.addEventListener('click', function () {
  closeFullPhoto();
  document.removeEventListener('keydown', onFullPhotoEscPress);
});

// Загрузка изображения и показ формы редактирования

var uploadFile = document.querySelector('#upload-file');
var edit = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');

var commentInput = edit.querySelector('.text__description');
var hashtagInput = edit.querySelector('.text__hashtags');

var onEditEscPress = function (evt) {
  if (commentInput === document.activeElement || hashtagInput === document.activeElement) {
    return;
  } else if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEdit();
  }
};

var openEdit = function () {
  edit.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onEditEscPress);
  // Значения по умолчанию
  scaleInput.value = 100 + ' % ';
  preview.style.transform = 'scale(1)';
};

var closeEdit = function () {
  edit.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscPress);
  uploadFile.value = '';
  // эффект сбрасывается на «Оригинал»
  previewImage.className = 'effects__preview--none';

  // поля для ввода хэш-тегов и комментария очищаются
  hashtagInput.value = '';
  commentInput.value = '';
};

uploadFile.addEventListener('change', function () {
  openEdit();
});

uploadCancel.addEventListener('click', function () {
  closeEdit();
});

// Редактирование размера изображения

var buttonScale = edit.querySelector('.img-upload__scale');

var scaleInput = edit.querySelector('.scale__control--value');
var preview = edit.querySelector('.img-upload__preview');

var onScaleClick = function (evt) {
  var STEP = 25;
  var MAX_COUNT = 100;
  var MIN_COUNT = 25;

  if (evt.target && evt.target.matches('.scale__control--bigger')) {
    var countPlus = parseInt(scaleInput.value, 10) + STEP;
    if (countPlus <= MAX_COUNT) {
      scaleInput.value = countPlus + ' % ';
      var scalePlus = countPlus / 100;
      preview.style.transform = 'scale(' + scalePlus + ')';
    }
  } else if (evt.target && evt.target.matches('.scale__control--smaller')) {
    var countMinus = parseInt(scaleInput.value, 10) - STEP;
    if (countMinus >= MIN_COUNT) {
      scaleInput.value = countMinus + ' % ';
      var scaleMinus = countMinus / 100;
      preview.style.transform = 'scale(' + scaleMinus + ')';
    }
  }
};

buttonScale.addEventListener('click', onScaleClick);


// Применение эффекта для изображения
// Применение эффекта для изображения полностью программировать в этом задании не нужно.

var effectsList = edit.querySelector('.img-upload__effects');
var previewImage = preview.querySelector('img');
// Значение по умолчанию
previewImage.classList.add('effects__preview--none');
var effectPin = edit.querySelector('.effect-level__pin');
var effectLevel = edit.querySelector('.effect-level__value');
var slider = edit.querySelector('.img-upload__effect-level');

// Добавление класса выбранного эффекта на превью
var onEffectChange = function (evt) {
  var selectedEffect = 'effects__preview--' + evt.target.value;
  previewImage.className = selectedEffect;
  // При выборе эффекта «Оригинал» слайдер скрывается.
  if (selectedEffect === 'effects__preview--none') {
    slider.classList.add('hidden');
    previewImage.style.filter = '';
  } else {
    slider.classList.remove('hidden');
  }
  // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться
  if (selectedEffect === 'effects__preview--chrome') {
    previewImage.style.filter = 'grayscale(100)';
    effectLevel.value = 100;
  } else if (selectedEffect === 'effects__preview--sepia') {
    previewImage.style.filter = 'sepia(1)';
    effectLevel.value = 100;
  } else if (selectedEffect === 'effects__preview--marvin') {
    previewImage.style.filter = 'invert(100%)';
    effectLevel.value = 100;
  } else if (selectedEffect === 'effects__preview--phobos') {
    previewImage.style.filter = 'blur(3px)';
    effectLevel.value = 100;
  } else if (selectedEffect === 'effects__preview--heat') {
    previewImage.style.filter = 'brightness(3)';
    effectLevel.value = 100;
  }
};

effectsList.addEventListener('change', onEffectChange);

effectPin.addEventListener('mouseup', function () {
  var LINE_WIDTH = 453;
  effectLevel.value = Math.round(effectPin.offsetLeft / LINE_WIDTH * 100);
  if (previewImage.classList.contains('effects__preview--chrome')) {
    previewImage.style.filter = 'grayscale(' + effectLevel.value / 100;
  }
  if (previewImage.classList.contains('effects__preview--sepia')) {
    previewImage.style.filter = 'sepia(' + effectLevel.value / 100;
  }
  if (previewImage.classList.contains('effects__preview--marvin')) {
    previewImage.style.filter = 'invert(' + effectLevel.value + '%) ';
  }
  if (previewImage.classList.contains('effects__preview--phobos')) {
    previewImage.style.filter = 'blur(' + effectLevel.value / 100 * 3 + 'px';
  }
  if (previewImage.classList.contains('effects__preview--heat')) {
    previewImage.style.filter = 'brightness(' + effectLevel.value / 100 * 3;
  }
});


// Валидация хеш-тегов
// хэш-теги необязательны

var form = document.querySelector('.img-upload__form');

// Функция разбивает строку на массив строк
var splitString = function (stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);

  return arrayOfStrings;
};

hashtagInput.addEventListener('input', function () {
  var hashtags = splitString(hashtagInput.value, ' ');
  var MAX_HASHTAGS = 5;
  var MAX_SYMBOLS = 20;
  var MIN_SYMBOLS = 2;
  var uniqueHashtags = [];

  for (var i = 0; i < hashtags.length; i++) {
    var reHashtag = /^#[\wa-яё]+$/i;
    var isHashtag = reHashtag.test(hashtags[i]);

    if (!isHashtag || hashtags[i].length < MIN_SYMBOLS) {
      hashtagInput.setCustomValidity('Хэш-тег начинается с символа # и не может состоять только из одной #. Строка после решётки должна состоять только из букв, чисел и символа подчеркивания. Хэш-теги разделяются пробелами.');
      form.reportValidity();
    } else {
      hashtagInput.setCustomValidity('');
    }
  }

  for (var k = 0; k < hashtags.length; k++) {
    if (hashtags[k].length > MAX_SYMBOLS) {
      hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 симв.');
      form.reportValidity();
    }
  }

  for (var j = 0; j < hashtags.length; j++) {
    var hashtag = hashtags[j].toLowerCase();
    var isDblValue = uniqueHashtags.indexOf(hashtag) !== -1;
    if (isDblValue) {
      hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      form.reportValidity();
    } else {
      uniqueHashtags.push(hashtag);
    }
  }

  if (hashtags.length > MAX_HASHTAGS) {
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
    form.reportValidity();
  }

  if (!hashtagInput.value) {
    hashtagInput.setCustomValidity('');
    return;
  }
});

// Валидация комментариев
commentInput.addEventListener('input', function () {
  var MAX_SYMBOLS = 140;
  if (commentInput.value.length > MAX_SYMBOLS) {
    commentInput.setCustomValidity('Длина комментария не может составлять больше 140 симв.');
    form.reportValidity();
  }

  if (!commentInput.value) {
    commentInput.setCustomValidity('');
    return;
  }
});
