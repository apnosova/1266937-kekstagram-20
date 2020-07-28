'use strict';

(function () {

  var EFFECT = 453;

  var effectsList = document.querySelector('.img-upload__effects');
  var previewImage = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.img-upload__effect-level');
  var pin = document.querySelector('.effect-level__pin');
  var line = document.querySelector('.effect-level__line');
  var effectDepth = document.querySelector('.effect-level__depth');
  var defaultEffect = document.querySelector('input[id=effect-none]');


  var classNameToEffect = {
    'effects__preview--none': '',
    'effects__preview--chrome': 'grayscale(100)',
    'effects__preview--sepia': 'sepia(1)',
    'effects__preview--marvin': 'invert(100%)',
    'effects__preview--phobos': 'blur(3px)',
    'effects__preview--heat': 'brightness(3)',
  };

  // При выборе эффекта «Оригинал» слайдер скрывается
  var addDefaultEffect = function () {
    if (defaultEffect.checked) {
      slider.classList.add('hidden');
      previewImage.style.filter = '';
    } else {
      slider.classList.remove('hidden');
    }
  };

  // Добавление класса выбранного эффекта на превью
  var onEffectChange = function (evt) {
    var selectedEffect = 'effects__preview--' + evt.target.value;
    previewImage.className = selectedEffect;

    addDefaultEffect();

    previewImage.style.filter = classNameToEffect[selectedEffect];

    // При переключении эффектов значения сбрасываются
    if (evt.target) {
      effectLevel.value = 100;
      pin.style.left = EFFECT + 'px';
      effectDepth.style.width = EFFECT + 'px';
    }
  };

  effectsList.addEventListener('change', onEffectChange);

  // Слайдер

  // Начальное значение 100%
  pin.style.left = EFFECT + 'px';
  effectDepth.style.width = EFFECT + 'px';

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
    effectLevel.value = Math.round(pin.offsetLeft / EFFECT * 100);

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
      previewImage.style.filter = 'brightness(' + (effectLevel.value / 100 + 0.5) * 2;
    }
  };

  window.effects = {
    addDefaultEffect: addDefaultEffect,
  };

})();
