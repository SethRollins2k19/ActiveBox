'use strict'


let sliderItems = [
	{
		'img': 'img/slider/slider-item-1.jpg',
		'title': '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
		'Author': "Susan Sims, Interaction Designer at XYZ",
		'isActive': true,
		'z-index': 2
	},
	{
		'img': 'img/slider/slider-item-2.jpg',
		'title': '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
		'Author': "Susan Sims, Interaction Designer at XYZ",
		'isActive': false,
		'z-index': 1
	},
	{
		'img': 'img/slider/slider-item-3.jpg',
		'title': '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
		'Author': "Susan Sims, Interaction Designer at XYZ",
		'isActive': false,
		'z-index': 0
	}
]


document.querySelector('.burger').addEventListener('click', (e)=>{
	document.querySelector('.nav').classList.toggle('nav--active');
})




sliderItems.forEach((item) => {
 	document.querySelector('.reviews__inner').appendChild(createSliderItem(item));
})

document.querySelector('.fa-caret-right').addEventListener('click', (e) =>{
	let sliderItemCenterLeft = 0;
	let centerRight = 350;
	let timer = setInterval(moveCard, 25);

	function moveCard() {
		if (sliderItemCenterLeft>centerRight){
			clearInterval(timer);
			changeActiveSlide();
		} else {
			document.querySelector('.reviews--active').style.left = sliderItemCenterLeft + '%';
			sliderItemCenterLeft+=50;
		}
	}
	
})

document.querySelector('.fa-caret-left').addEventListener('click', (e) =>{
	let sliderItemCenterLeft = 0;
	let centerRight = -350;
	let timer = setInterval(moveCard, 25);

	function moveCard() {
		if (sliderItemCenterLeft<centerRight){
			clearInterval(timer);
			changeActiveSlide();
		} else {
			document.querySelector('.reviews--active').style.left = sliderItemCenterLeft + '%';
			sliderItemCenterLeft-=50;
		}
	}

})

let links = document.querySelectorAll('.nav__link');
let counterClickOnLink = 0;
links.forEach((item) => {
  item.addEventListener('click',(e)=>{
  	e.preventDefault();
  	counterClickOnLink ++;
  	let ourPos = pageYOffset;
  	let contPos = document.querySelector(item.dataset.linkId).getBoundingClientRect().top + pageYOffset - 50;
  	if (ourPos > contPos){
  		let timer = setInterval(() => {
			if (pageYOffset < contPos || counterClickOnLink > 1){
				clearInterval(timer);
				document.querySelector('.nav').classList.remove('nav--active');
				counterClickOnLink --;
			} else {
				scrollTo(0, ourPos);
				ourPos-=10;
			}
 	}, 5)
  	} else {
  	let timer = setInterval(() => {
		if (pageYOffset > contPos || counterClickOnLink > 1 || ourPos > document.body.offsetHeight - document.querySelector('.about__inner').offsetHeight -  document.querySelector('.reviews').offsetHeight){
			clearInterval(timer);
			document.querySelector('.nav').classList.remove('nav--active');
			counterClickOnLink --;
		} else {
			scrollTo(0, ourPos);
			ourPos+=10;
		}
 	}, 5)
  	}

  	
  })
})


if (window.pageYOffset >= document.querySelector('.intro').offsetHeight-60){
		document.querySelector('.header').classList.add('header--inmotion');
	} else {
		document.querySelector('.header').classList.remove('header--inmotion');
	}
document.addEventListener('scroll', (e)=>{
	if (window.pageYOffset >= document.querySelector('.intro').offsetHeight-60){
		document.querySelector('.header').classList.add('header--inmotion');
	} else {
		document.querySelector('.header').classList.remove('header--inmotion');
	}
})


function createSliderItem (sliderItem){
	let sliderCard = document.createElement('div');
	sliderCard.classList.add('reviews__item');
	if (sliderItem['isActive']){
		sliderCard.classList.add('reviews--active')
	}

	let sliderPhoto = document.createElement('div');
	sliderPhoto.classList.add('reviews__photo');
	let sliderImg = document.createElement('img');
	sliderImg.classList.add('reviews__img');
	sliderImg.src = sliderItem['img'];

	sliderPhoto.appendChild(sliderImg);

	let sliderContent = document.createElement('div');
	sliderContent.classList.add('reviews__content');
	let sliderTitle = document.createElement('div');
	sliderTitle.classList.add('reviews__title');
	sliderTitle.textContent = sliderItem['title'];
	let sliderAuthor = document.createElement('div');
	sliderAuthor.classList.add('reviews__author');
	sliderAuthor.textContent = sliderItem['Author'];

	sliderContent.appendChild(sliderTitle);
	sliderContent.appendChild(sliderAuthor);
	sliderCard.appendChild(sliderPhoto);
	sliderCard.appendChild(sliderContent);
	sliderCard.style.zIndex = sliderItem['z-index'];

	return sliderCard;
}



function changeActiveSlide(){
	let slideItems = document.querySelectorAll('.reviews__item');
	slideItems.forEach((item) => {
		item.style.zIndex = 1 + Number(item.style.zIndex); 
		if (new Number(item.style.zIndex) == 3){
			item.classList.remove('reviews--active');
			item.style.left = 0;
			item.style.zIndex = 0;
		} else if (new Number(item.style.zIndex) == 2){
			item.classList.add('reviews--active');
		}
	})
};
