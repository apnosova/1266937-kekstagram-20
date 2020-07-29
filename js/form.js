'use strict';

(function () {
  var EFFECT = 453;

  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var edit = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var commentInput = edit.querySelector('.text__description');
  var hashtagInput = edit.querySelector('.text__hashtags');
  var effectLevel = document.querySelector('.effect-level__value');
  var effectDepth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');
  var preview = document.querySelector('.img-upload__preview');
  var scaleInput = document.querySelector('.scale__control--value');
  var previewImage = preview.querySelector('img');
  var defaultEffect = document.querySelector('input[id=effect-none]');


  // Загрузка изображения и показ формы редактирования
  var openEdit = function () {
    edit.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    window.effects.hideSliderOnDefault();
    document.addEventListener('keydown', onEditEscPress);
    scaleInput.value = 100 + ' % ';
    preview.style.transform = 'scale(1)';
    effectLevel.value = 100;
    effectDepth.style.width = EFFECT + 'px';
    form.addEventListener('submit', onFormSubmit);
  };

  var closeEdit = function () {
    edit.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onEditEscPress);
    uploadFile.value = '';
    previewImage.className = 'effects__preview--none';
    defaultEffect.checked = true;
    previewImage.style.filter = '';
    pin.style.left = EFFECT + 'px';
    effectDepth.style.width = EFFECT + 'px';
    effectLevel.value = 100;
    scaleInput.value = 100 + ' % ';
    hashtagInput.value = '';
    commentInput.value = '';
  };

  var onEditEscPress = function (evt) {
    if (commentInput === document.activeElement || hashtagInput === document.activeElement) {
      return;
    } else {
      window.util.isEscEvent(evt, closeEdit);
    }
  };

  uploadFile.addEventListener('change', function () {
    openEdit();
  });

  uploadCancel.addEventListener('click', function () {
    closeEdit();
  });

  // Обработчик отправки формы отменяет действие по умолчанию и отправляет данные на сервер
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onSuccess, onError);
    closeEdit();
  };

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
