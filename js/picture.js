'use strict';

// Модуль для отрисовки миниатюры
(function () {
  var MAX_PICTURES = 25;
  var MAX_COMMENTS = 5;

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // функция создания DOM-элемента на основе JS-объекта

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };


  // функция для создания массива комментариев из сгенерированных JS-объектов
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();


    window.util.shuffle(pictures);
    for (var i = 0; i < MAX_PICTURES; i++) {
      fragment.appendChild(renderPicture(pictures[i]));

    }

    picturesList.appendChild(fragment);

  };

  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_COMMENTS; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }

    commentsList.appendChild(fragment);
  };

  window.backend.load(function (data) {
    renderComments(data);
    renderPictures(data);
  }, function () {});
})();
