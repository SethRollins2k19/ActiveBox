'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var links = document.querySelectorAll('.nav__link');
var isSlide = false;
var sliderItems = [{
    img: 'img/slider/slider-item-1.jpg',
    title: '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
    Author: "Susan Sims, Interaction Designer at XYZ"
}, {
    img: 'img/slider/slider-item-2.jpg',
    title: '“Hello I want to work in you team”',
    Author: "Susan Sims, Interaction Designer at XYZ"
}, {
    img: 'img/slider/slider-item-3.jpg',
    title: '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
    Author: "Susan Sims, Interaction Designer at XYZ"
}];

var initBurger = function initBurger() {
    document.querySelector('.burger').addEventListener('click', function (e) {
        document.querySelector('.nav').classList.toggle('nav--active');
    });
};

var initScroll = async function initScroll(links) {
    var counterClickOnLink = 0;
    var IETest = new Promise(function (resolve, reject) {
        var currentPos = window.pageYOffset + 1;
        window.scrollTo({
            top: currentPos,
            behavior: "smooth"
        });
        setTimeout(function () {
            resolve(currentPos);
        }, 200);
    });
    IETest.then(function (pos) {
        if (window.pageYOffset === pos) {
            scrollForAll(links);
        } else {
            IEScrollToFunction(links, counterClickOnLink);
        }
    });
};
var scrollForAll = function scrollForAll(links) {
    links.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var contPos = document.querySelector(item.dataset.linkId).getBoundingClientRect().top + pageYOffset - 50;
            window.scrollTo({
                top: contPos,
                behavior: "smooth"
            });
        });
    });
};
var headerPositionScrolling = function headerPositionScrolling(className, afterBlock, addClassName) {
    if (window.pageYOffset >= document.querySelector(afterBlock).offsetHeight - 60) {
        document.querySelector(className).classList.add(addClassName);
    } else {
        document.querySelector(className).classList.remove(addClassName);
    }
    document.addEventListener('scroll', function (e) {
        if (window.pageYOffset >= document.querySelector(afterBlock).offsetHeight - 60) {
            document.querySelector(className).classList.add(addClassName);
        } else {
            document.querySelector(className).classList.remove(addClassName);
        }
    });
};

var IEScrollToFunction = function IEScrollToFunction(links, counterClickOnLink) {
    console.log("IE init");
    links.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            counterClickOnLink++;
            var ourPos = pageYOffset;
            var contPos = document.querySelector(item.dataset.linkId).getBoundingClientRect().top + pageYOffset - 50;
            if (ourPos > contPos) {
                var timer = setInterval(function () {
                    if (pageYOffset < contPos || counterClickOnLink > 1) {
                        clearInterval(timer);
                        document.querySelector('.nav').classList.remove('nav--active');
                        counterClickOnLink--;
                    } else {
                        scrollTo(0, ourPos);
                        ourPos -= 10;
                    }
                }, 5);
            } else {
                var _timer = setInterval(function () {
                    if (pageYOffset > contPos || counterClickOnLink > 1 || ourPos > document.body.offsetHeight - document.querySelector('.about__inner').offsetHeight - document.querySelector('.reviews').offsetHeight) {
                        clearInterval(_timer);
                        document.querySelector('.nav').classList.remove('nav--active');
                        counterClickOnLink--;
                    } else {
                        scrollTo(0, ourPos);
                        ourPos += 10;
                    }
                }, 5);
            }
        });
    });
};
var initSlider = function initSlider(sliders) {
    var items = [].concat(_toConsumableArray(sliders.map(function (item) {
        return createSliderItem(item);
    })));
    var startCount = 0;
    var backItem = document.querySelectorAll('.reviews__item')[0];
    backItem.innerHTML = items[0];
    var frontItem = document.querySelector('.reviews__item--background');
    frontItem.innerHTML = items[0];
    document.querySelector('.fa-caret-right').addEventListener('click', function () {
        nextSlide();
    });
    document.querySelector('.fa-caret-left').addEventListener('click', function () {
        prevSlide();
    });

    async function nextSlide() {
        startCount++;
        if (startCount < items.length) {
            frontItem.style.left = 110 + "%";
            await setTimeout(function () {
                frontItem.innerHTML = "";
                frontItem.style.left = 0;
                frontItem.innerHTML = items[startCount];
            }, 300);
        } else {
            startCount = 0;
            frontItem.style.left = 110 + "%";
            await setTimeout(function () {
                frontItem.innerHTML = "";
                frontItem.style.left = 0;
                frontItem.innerHTML = items[startCount];
            }, 300);
        }
    }

    async function prevSlide() {
        startCount--;
        if (startCount >= 0) {
            frontItem.style.left = -110 + "%";
            await setTimeout(function () {
                frontItem.innerHTML = "";
                frontItem.style.left = 0;
                frontItem.innerHTML = items[startCount];
            }, 300);
        } else {
            startCount = items.length - 1;
            frontItem.style.left = -110 + "%";
            await setTimeout(function () {
                frontItem.innerHTML = "";
                frontItem.style.left = 0;
                frontItem.innerHTML = items[startCount];
            }, 300);
        }
    }
};
var createSliderItem = function createSliderItem(sliderItem) {
    var img = sliderItem.img,
        author = sliderItem.author,
        title = sliderItem.title;

    var sliderCard = '<div class="reviews__img">\n                        <img src="' + img + '" alt="reviews">\n                    </div>\n                    <div class="reviews__text">\n                        <p class="reviews__description">' + title + '</p>\n                        <p class="reviews__author">' + author + '</p>\n                    </div>';
    return sliderCard;
};
//burger menu click
initBurger();
//header show after
headerPositionScrolling('.header', '.intro', 'header--inmotion');
//slider init
initSlider(sliderItems);
//scroll init IE is supported
initScroll(links);