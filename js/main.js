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

// функция генерации случайного целого числа
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция для создания списка комментариев
var getCommentsArray = function () {
  var comments = [];
  for (var i = 0; i < getRandomInt(0, 10); i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: MESSAGES[getRandomInt(0, MESSAGES.length)],
      name: NAMES[getRandomInt(0, NAMES.length)]
    });
  }
  return comments;
};

// функция переупорядочивает случайным образом элементы массива
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    // [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// функция для создания массива из 25 сгенерированных JS-объектов
var getPicturesArray = function () {
  var pictures = [];
  var picturesLength = 25;
  for (var i = 1; i <= picturesLength; i++) {
    pictures.push({
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: getRandomInt(15, 200),
      comments: getCommentsArray().length
    });
    shuffle(pictures);
  }
  return pictures;
};

// функция создания DOM-элемента на основе JS-объекта
var renderComments = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var renderPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var appendComments = function () {
  var fragment = document.createDocumentFragment();
  var comments = getCommentsArray();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderComments(comments[i]));
  }
  commentsList.appendChild(fragment);
};

var appendPictures = function () {
  var fragment = document.createDocumentFragment();
  var pictures = getPicturesArray();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPictures(pictures[i]));
  }
  picturesList.appendChild(fragment);
};

appendComments();

appendPictures();
