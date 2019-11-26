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
sliderItems.forEach((item) => {
 	document.querySelector('.reviews__inner').appendChild(createSliderItem(item));
})
document.querySelector('.fa-caret-right').addEventListener('click', (e) =>{
	let sliderItemCenterLeft = 0;
	let centerRight = 350;
	let timer = setInterval(moveCard, 25)

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
	let timer = setInterval(moveCard, 25)

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
// 2050px

function changeActiveSlide(){

	// let allItem = [];
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

	// for (let i = 0; i < sliderItems; i++){
	// 	let woop = {
	// 		item: sliderItems[i],
	// 		zIndex: Number(sliderItems[i].style.zIndex)
	// 	};
	// 	allItem.push()
	// }


	// slideItems.forEach((item) => {
	// 	item.style.zIndex = 1 + Number(item.style.zIndex); 
	// });
	// allItem[allItem.length-1].zIndex = '0';
	// allItem.sort((prev, next) => Number(prev.style.zIndex) - Number(next.style.zIndex));
	

























