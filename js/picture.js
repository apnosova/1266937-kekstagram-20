'use strict';

// Модуль для отрисовки миниатюры
(function () {

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // функция для создания списка комментариев
  var getCommentsArray = function () {
    var comments = [];
    for (var i = 0; i < window.util.getRandomIntInclusive(0, 10); i++) {
      comments.push({
        avatar: 'img/avatar-' + window.util.getRandomIntInclusive(1, 6) + '.svg',
        message: window.util.getRandomElementfromArray(window.data.MESSAGES),
        name: window.util.getRandomElementfromArray(window.data.NAMES)
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

  // функция для создания массива фотографий из 25 сгенерированных JS-объектов
  var getPicturesArray = function () {
    var pictures = [];
    var MAX_PICTURES = 25;
    for (var i = 1; i <= MAX_PICTURES; i++) {
      pictures.push({
        url: 'photos/' + i + '.jpg',
        description: '',
        likes: window.util.getRandomIntInclusive(15, 200),
        comments: getCommentsArray().length
      });
      window.util.shuffle(pictures);
    }
    return pictures;
  };

  // функция для создания массива комментариев из сгенерированных JS-объектов
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
})();
