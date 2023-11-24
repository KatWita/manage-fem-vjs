import data from './data.js'

const nav = document.querySelector('.nav')
const navLinks = document.querySelectorAll('.nav__link')
const burgerBtn = document.querySelector('.nav__burger-box')
const slideContainer = document.querySelector('.slider__container')
const dotContainer = document.querySelector('.slider__dot-container')

const toggleMenu = () => {
	nav.classList.toggle('active')
}

const navOnScroll = () => {
	const illustrationFromTop = document.querySelector('.header__illustration').getBoundingClientRect().top

	if (window.scrollY > illustrationFromTop) {
		nav.classList.add('scroll')
	} else {
		nav.classList.remove('scroll')
	}
}

if (data.length === 1) {
	dotContainer.style.display = 'none'
	slideContainer.style.transform = `translateX(0)`
}

let people = [...data]
if (data.length === 2) {
	people = [...data, ...data]
}

if (data.length === 3) {
	people = [...data, ...data.slice(1, 2)]
}

slideContainer.innerHTML = people
	.map((person, index) => {
		const { img, name, quote } = person
		let position = 'next'

		if (index === 0) {
			position = 'first'
		}
		if (index === 1) {
			position = 'active'
		}
		if (index === people.length - 1) {
			position = 'last'
		}
		if (data.length <= 1) {
			position = 'active'
		}

		return `<div class="slider__slide ${position}">
	  <img src="${img}" alt="${name}'s face" class="slider__img">
	  <p class="slider__name">${name}</p>
	  <p class="slider__quote">${quote}</p>
	</div>`
	})
	.join('')

dotContainer.innerHTML = data
	.map(() => {
		return `<div class="slider__dot"></div>`
	})
	.join('')

const dots = dotContainer.querySelectorAll('.slider__dot')

if (data.length > 1) {
	dots[1].classList.add('active')
}

const carouselSpeed = 3000
let index = 0

const handleDots = () => {
	dots.forEach(dot => {
		if (dot.classList.contains('active')) {
			dot.classList.remove('active')
		}
	})

	if (data.length === 2) {
		if (index === 0) {
			dots[1].classList.add('active')
		} else if (index === 1) {
			dots[0].classList.add('active')
		} else if (index === 2) {
			dots[1].classList.add('active')
		} else {
			dots[0].classList.add('active')
		}
	}

	if (data.length === 3) {
		if (index === 0) {
			dots[1].classList.add('active')
		} else if (index === 1) {
			dots[2].classList.add('active')
		} else if (index === 2) {
			dots[1].classList.add('active')
		} else {
			dots[0].classList.add('active')
		}
	}

	if (data.length > 3) {
		if (index === 0) {
			dots[1].classList.add('active')
		} else if (index === 1) {
			dots[2].classList.add('active')
		} else if (index === 2) {
			dots[3].classList.add('active')
		} else {
			dots[0].classList.add('active')
		}
	}
}

const handleCarousel = () => {
	index++

	if (index > people.length - 1) {
		index = 0
	}

	if (data.length > 1) {
		handleDots()
		changeSlide()
	}
}

let startCarousel = setInterval(handleCarousel, carouselSpeed)

const changeSlide = () => {
	const first = slideContainer.querySelector('.first')
	const active = slideContainer.querySelector('.active')
	const last = slideContainer.querySelector('.last')
	let next = active.nextElementSibling

	if (!next) {
		next = slideContainer.firstElementChild
	}

	active.classList.remove('active')
	last.classList.remove('last')
	next.classList.remove('next')
	first.classList.remove('first')

	first.classList.add('last')
	last.classList.add('next')
	next.classList.add('active')
	active.classList.add('first')
}

burgerBtn.addEventListener('click', toggleMenu)
navLinks.forEach(link => link.addEventListener('click', toggleMenu))
window.addEventListener('scroll', navOnScroll)
