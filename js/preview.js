'use strict';
// Модуль для отрисовки увеличенного изображения

(function () {
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

  // Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden
  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');

  // Возможность просмотра любой фотографии в полноразмерном режиме
  var thumbnails = document.querySelectorAll('.picture__img');
  var fullPhoto = fullPicture.querySelector('img');
  var thumbnailLinks = document.querySelectorAll('a.picture');

  var openFullPhoto = function () {
    fullPicture.classList.remove('hidden');
    document.addEventListener('keydown', onFullPhotoEscPress);
    // Контейнер с фотографиями не прокручивается при скролле
    document.body.classList.add('modal-open');
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

  // enlargeThumbnailOnClick();


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
    document.body.classList.remove('modal-open');
  };

  fullPictureClose.addEventListener('click', function () {
    closeFullPhoto();
    document.removeEventListener('keydown', onFullPhotoEscPress);
  });

  window.preview = {
    renderFullPicture: renderFullPicture,
    openFullPhoto: openFullPhoto,
    enlargeThumbnailOnClick: enlargeThumbnailOnClick,
  };
})();
