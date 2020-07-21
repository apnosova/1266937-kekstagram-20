'use strict';

// Модуль для работы с формой редактирования изображения
(function () {

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
        return;
      } else {
        hashtagInput.setCustomValidity('');
      }

      if (hashtags[i].length > MAX_SYMBOLS) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 симв.');
        form.reportValidity();
        return;
      }

      var hashtag = hashtags[i].toLowerCase();
      var isDblValue = uniqueHashtags.indexOf(hashtag) !== -1;
      if (isDblValue) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        form.reportValidity();
        return;
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
})();
