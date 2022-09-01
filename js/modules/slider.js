'use strict'
function slider({
  container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field
}) {
    
    //SLIDER var my variant
    /*
    const sliderImages = document.querySelectorAll('.offer__slide')
    let currentIndexContent = +document.querySelector('#current').textContent
    
    function formNumber(number, node) {
        if(number>=0 && number <10) {
            node.textContent =  `0${number}`
        }
        else {node.textContent = number}
    }
    formNumber(sliderImages.length, document.querySelector('#total'))

    function hideSliderImages() {
        sliderImages.forEach(image => {
            image.classList.add('hide')
            image.classList.remove('show', 'fade')
        })
    }
    function showSlideImage (i=0) {
        sliderImages[i].classList.add('show', 'fade')
        sliderImages[i].classList.remove('hide')        
        formNumber(currentIndexContent+1, document.querySelector('#current'))
    }
    hideSliderImages()
    showSlideImage(currentIndexContent)

    document.querySelector('.offer__slider-prev').addEventListener('click', () => {
        hideSliderImages()
        if (currentIndexContent==0)
        {
            currentIndexContent = sliderImages.length-1
            showSlideImage(currentIndexContent)
        }
        else {            
            currentIndexContent--
            showSlideImage(currentIndexContent) 
        }
    })

    document.querySelector('.offer__slider-next').addEventListener('click', () => {
        hideSliderImages()
         if (currentIndexContent>=sliderImages.length-1)
         {            
            currentIndexContent = 0
            showSlideImage(currentIndexContent)
         }
         else
        {
        currentIndexContent++
        showSlideImage(currentIndexContent)
        }
        
    })
*/
    // SLIDER 2
/*
  const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current")
let slideIndex = 1

showSlides(slideIndex);
if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } 
  else {
    total.textContent = slides.length;
  }
function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((item) => (item.style.display = "none"));

  slides[slideIndex - 1].style.display = "block";

  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } 
  else {
    current.textContent = slideIndex;
  }
}
function plusSlides(n) {
  showSlides((slideIndex += n));
}
prev.addEventListener("click", () => {
  plusSlides(-1);
});

next.addEventListener("click", () => {
  plusSlides(1);
});
*/
    //SLIDER 3 carousell

  const slides = document.querySelectorAll(slide),
  slider = document.querySelector(container),
  prev = document.querySelector(prevArrow),
  next = document.querySelector(nextArrow),
  total = document.querySelector(totalCounter),
  current = document.querySelector(currentCounter),
  slideWrapper = document.querySelector(wrapper),
  slidesField = document.querySelector(field),
  width = window.getComputedStyle(slideWrapper).width; // получение ширины окна по элементу

let slideIndex = 1,
offset = 0

function dotOpacityChange () {
dots.forEach(dot => dot.style.opacity = '.5')
dots[slideIndex-1].style.opacity = 1   
}

function slideOverflowCheck() {
if (slides.length<10) {
  current.textContent = `0${slideIndex}`
} else {
  current.textContent = slideIndex
} 
}

function stringNumberFormat (string) {
return +string.replace(/\D/g, '')
}

if (slides.length < 10) {
total.textContent = `0${slides.length}`;
current.textContent = `0${slideIndex}`;
} 
else {
total.textContent = slides.length;
current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%'
slidesField.style.display = 'flex'
slidesField.style.transition = '0.5s all'

slideWrapper.style.overflow = 'hidden'

slides.forEach(slide => {
slide.style.width = width
})

slider.style.position = 'relative'
const indicators = document.createElement('ol'),
dots = []
indicators.classList.add('carousel-indicators')
slider.append(indicators)

for (let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i+1)
dot.classList.add('dot')
if (i == 0) {
  dot.style.opacity = 1;
}
indicators.append(dot)
dots.push(dot)
}

next.addEventListener('click', () => {
if(offset === stringNumberFormat(width)*(slides.length-1)){
  offset = 0
}
else {
  offset += stringNumberFormat(width)
}
slidesField.style.transform = `translateX(-${offset}px)`

if(slideIndex == slides.length) {
  slideIndex = 1
}
else {
  slideIndex++
}

slideOverflowCheck()
dotOpacityChange()
})

prev.addEventListener('click', () => { 
if(offset == 0){
  offset = stringNumberFormat(width)*(slides.length-1)
}
else {
  offset -= stringNumberFormat(width)
}
slidesField.style.transform = `translateX(-${offset}px)`

if(slideIndex == 1) {
  slideIndex = slides.length
}
else {
  slideIndex--
}

slideOverflowCheck()
dotOpacityChange ()
})

dots.forEach(dot => {
dot.addEventListener('click', (e)=> {
  const slideTo = e.target.getAttribute('data-slide-to')

  slideIndex = slideTo;
  offset = stringNumberFormat(width)*(slideTo-1)

  slidesField.style.transform = `translateX(-${offset}px)`

  slideOverflowCheck()
  dotOpacityChange ()       
})
})
}
export default slider;