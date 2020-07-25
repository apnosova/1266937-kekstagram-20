'use strict';

// Модуль для работы с формой редактирования изображения
(function () {

  // Загрузка изображения и показ формы редактирования
  var uploadFile = document.querySelector('#upload-file');
  var edit = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');

  var commentInput = edit.querySelector('.text__description');
  var hashtagInput = edit.querySelector('.text__hashtags');

  var effectLevel = document.querySelector('.effect-level__value');
  var effectDepth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');

  // var effectLevel = document.querySelector('.effect-level__value');

  var onEditEscPress = function (evt) {
    if (commentInput === document.activeElement || hashtagInput === document.activeElement) {
      return;
    } else {
      window.util.isEscEvent(evt, closeEdit);
    }
  };

  var openEdit = function () {
    edit.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onEditEscPress);
    // Дуфолтные значения
    scaleInput.value = 100 + ' % ';
    preview.style.transform = 'scale(1)';
    effectLevel.value = 100;
    effectDepth.style.width = 453 + 'px';
  };

  var closeEdit = function () {
    edit.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onEditEscPress);
    uploadFile.value = '';
    // Дефолтные значения
    // эффект сбрасывается на «Оригинал»
    previewImage.className = 'none';
    previewImage.style.filter = '';
    pin.style.left = 453 + 'px';
    effectDepth.style.width = 453 + 'px';
    effectLevel.value = 100;
    scaleInput.value = 100 + ' % ';
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
  var previewImage = preview.querySelector('img');

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


  // Валидация хеш-тегов
  // хэш-теги необязательны

  var form = document.querySelector('.img-upload__form');


  hashtagInput.addEventListener('input', function () {
    var hashtags = window.util.splitString(hashtagInput.value, ' ');
    var MAX_HASHTAGS = 5;
    var MAX_SYMBOLS = 20;
    var MIN_SYMBOLS = 2;
    var uniqueHashtags = [];

    for (var i = 0; i < hashtags.length; i++) {
      var reHashtag = /^#[\wa-яё]+$/i;
      var isHashtag = reHashtag.test(hashtags[i]);

      if (!hashtagInput.value) {
        hashtagInput.setCustomValidity('');
        return;
      }

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


  // Обработчик отправки формы отменяет действие по умолчанию и отправляет данные на сервер
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onSuccess, onError);
    closeEdit();
  };

  form.addEventListener('submit', onFormSubmit);

  // Если отправка данных прошла успешно, показывается соответствующее сообщение
  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    document.querySelector('main').appendChild(successElement);

    var successButton = document.querySelector('.success__button');

    var closeSuccessMessage = function () {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      document.removeEventListener('click', onDocumentSuccessClick);
    };

    successButton.addEventListener('click', function () {
      closeSuccessMessage();
    });

    // по нажатию на клавишу Esc и по клику на произвольную область экрана
    var onSuccessMessageEscPress = function (evt) {
      window.util.isEscEvent(evt, closeSuccessMessage);
    };

    document.addEventListener('keydown', onSuccessMessageEscPress);

    var onDocumentSuccessClick = function (evt) {
      if (evt.target.className !== 'success__inner') {
        closeSuccessMessage();
      }
    };

    document.addEventListener('click', onDocumentSuccessClick);
  };


  // Если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение
  var onError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    document.querySelector('main').appendChild(errorElement);

    var errorButton = document.querySelector('.error__button');

    var closeErrorMessage = function () {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorMessageEscPress);
      document.removeEventListener('click', onDocumentErrorClick);
    };

    errorButton.addEventListener('click', function () {
      closeErrorMessage();
    });

    // по нажатию на клавишу Esc и по клику на произвольную область экрана
    var onErrorMessageEscPress = function (evt) {
      window.util.isEscEvent(evt, closeErrorMessage);
    };

    document.addEventListener('keydown', onErrorMessageEscPress);

    var onDocumentErrorClick = function (evt) {
      if (evt.target.className !== 'error__inner') {
        closeErrorMessage();
      }
    };

    document.addEventListener('click', onDocumentErrorClick);
  };
})();
