'use strict';

(function () {

  // Применение эффекта для изображения
  var effectsList = document.querySelector('.img-upload__effects');
  var previewImage = document.querySelector('.img-upload__preview img');
  // Значение по умолчанию
  previewImage.classList.add('effects__preview--none');
  var effectLevel = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.img-upload__effect-level');

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

    if (selectedEffect === 'effects__preview--chrome') {
      previewImage.style.filter = 'grayscale(100)';
    } else if (selectedEffect === 'effects__preview--sepia') {
      previewImage.style.filter = 'sepia(1)';
    } else if (selectedEffect === 'effects__preview--marvin') {
      previewImage.style.filter = 'invert(100%)';
    } else if (selectedEffect === 'effects__preview--phobos') {
      previewImage.style.filter = 'blur(3px)';
    } else if (selectedEffect === 'effects__preview--heat') {
      previewImage.style.filter = 'brightness(3)';
    }

    // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться
    if (evt.target) {
      effectLevel.value = 100;
      pin.style.left = 453 + 'px';
      effectDepth.style.width = 453 + 'px';
    }
  };

  effectsList.addEventListener('change', onEffectChange);

  // Слайдер

  var pin = document.querySelector('.effect-level__pin');
  var line = document.querySelector('.effect-level__line');
  var effectDepth = document.querySelector('.effect-level__depth');

  // Начальное значение 100%
  pin.style.left = 453 + 'px';
  effectDepth.style.width = 453 + 'px';

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // предотвратить запуск выделения

    var shiftX = evt.clientX - pin.getBoundingClientRect().left;

    var onMouseMove = function (moveEvt) {
      var newLeft = moveEvt.clientX - shiftX - line.getBoundingClientRect().left;

      // курсор вышел из слайдера => оставить бегунок в его границах.
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = line.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      pin.style.left = newLeft + 'px';
      effectDepth.style.width = newLeft + 'px';

      applyEffect();
    };

    var onMouseUp = function () {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pin.addEventListener('dragstart', function () {
    return false;
  });

  // Наложение эффекта на изображение
  var applyEffect = function () {
    var LINE_WIDTH = 453;

    effectLevel.value = Math.round(pin.offsetLeft / LINE_WIDTH * 100);
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
  };
})();
