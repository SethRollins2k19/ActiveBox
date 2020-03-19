'use strict'

let links = document.querySelectorAll('.nav__link');
let isSlide = false;
const sliderItems = [
	{
		img: 'img/slider/slider-item-1.jpg',
		title: '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
		Author: "Susan Sims, Interaction Designer at XYZ",
	},
	{
		img: 'img/slider/slider-item-2.jpg',
		title: '“Hello I want to work in you team”',
		Author: "Susan Sims, Interaction Designer at XYZ",
	},
	{
		img: 'img/slider/slider-item-3.jpg',
		title: '“Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Aenean eu leo quam...”',
		Author: "Susan Sims, Interaction Designer at XYZ",
	}
]


const initBurger = () =>{
    document.querySelector('.burger').addEventListener('click', (e)=>{
        document.querySelector('.nav').classList.toggle('nav--active');
    })
}

const initScroll = async (links) => {
    let counterClickOnLink = 0;
    let IETest = new Promise((resolve, reject) => {
        let currentPos = window.pageYOffset + 1
        window.scrollTo({
            top: currentPos,
            behavior: "smooth"
        })
        setTimeout(()=>{
            resolve(currentPos)
        },200)
    })
    IETest.then( pos => {
       if(window.pageYOffset === pos){
           scrollForAll(links)
       } else {
           IEScrollToFunction(links,counterClickOnLink)
       }
    })
}
const scrollForAll = (links) => {
    links.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let contPos = document.querySelector(item.dataset.linkId).getBoundingClientRect().top + pageYOffset - 50;
            window.scrollTo({
                top: contPos,
                behavior: "smooth"
            })
        })
    })
}
const headerPositionScrolling = (className,afterBlock, addClassName) => {
    if (window.pageYOffset >= document.querySelector(afterBlock).offsetHeight-60){
        document.querySelector(className).classList.add(addClassName);
    } else {
        document.querySelector(className).classList.remove(addClassName);
    }
    document.addEventListener('scroll', (e)=>{
        if (window.pageYOffset >= document.querySelector(afterBlock).offsetHeight-60){
            document.querySelector(className).classList.add(addClassName);
        } else {
            document.querySelector(className).classList.remove(addClassName);
        }
    })
}

const IEScrollToFunction = (links,counterClickOnLink)=> {
    console.log("IE init")
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
}
const initSlider = (sliders) => {
    let items = [...sliders.map(item => createSliderItem(item))]
    let startCount = 0
    let backItem = document.querySelectorAll('.reviews__item')[0]
    backItem.innerHTML = items[0]
    let frontItem = document.querySelector('.reviews__item--background')
    frontItem.innerHTML = items[0]
    document.querySelector('.fa-caret-right').addEventListener('click', () => {
        nextSlide()
    })
    document.querySelector('.fa-caret-left').addEventListener('click', () => {
        prevSlide()
    })

    async function nextSlide() {
        startCount++
        if (startCount < items.length) {
            frontItem.style.left = 110 + "%"
            await setTimeout(() => {
                frontItem.innerHTML = ""
                frontItem.style.left = 0
                frontItem.innerHTML = items[startCount]
            }, 300)
        } else {
            startCount = 0
            frontItem.style.left = 110 + "%"
            await setTimeout(() => {
                frontItem.innerHTML = ""
                frontItem.style.left = 0
                frontItem.innerHTML = items[startCount]
            }, 300)
        }
    }

    async function prevSlide() {
        startCount--
        if (startCount >= 0) {
            frontItem.style.left = -110 + "%"
            await setTimeout(() => {
                frontItem.innerHTML = ""
                frontItem.style.left = 0
                frontItem.innerHTML = items[startCount]
            }, 300)
        } else {
            startCount = items.length - 1
            frontItem.style.left = -110 + "%"
            await setTimeout(() => {
                frontItem.innerHTML = ""
                frontItem.style.left = 0
                frontItem.innerHTML = items[startCount]
            }, 300)
        }

    }
}
const createSliderItem  = (sliderItem) => {
    let {img, author, title} = sliderItem
    let sliderCard = `<div class="reviews__img">
                        <img src="${img}" alt="reviews">
                    </div>
                    <div class="reviews__text">
                        <p class="reviews__description">${title}</p>
                        <p class="reviews__author">${author}</p>
                    </div>`
    return sliderCard;
}

initBurger()
headerPositionScrolling('.header','.intro','header--inmotion')
initSlider(sliderItems)
initScroll(links)
