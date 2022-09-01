/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function calc() {
        //CALC

        const result = document.querySelector('.calculating__result span')
        let sex, ratio, height, weight, age
    
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex')
        } else {
            sex = "female"
            localStorage.setItem('sex', 'female')
        }
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio')
        } else {
            ratio = 1.375
            localStorage.setItem('ratio', 1.375)
        }
    
        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector)
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass)
                if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass)
                }
                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass)
                }
            })
        }
        initLocalSettings('#gender div', 'calculating__choose-item_active')
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function calcTotal() {
            if(!sex || !height || !weight || !ratio) {
                result.textContent = '____'
                return;
            }
    
            if(sex === "female") {
                result.textContent = Math.round((447.6 + (9.2*weight) + (3.1*height) - (4.3*age))*ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4*weight) + (4.8*height) - (5.7*age))*ratio);
            }
            
        }
        //calcTotal();
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector)
    
            elements.forEach (elem => {
                elem.addEventListener('click', (e)=> {
                    if(e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio')
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                    } else {
                        sex = e.target.getAttribute('id')
                        localStorage.setItem('sex', e.target.getAttribute('id'))
                    }
                    console.log(ratio, sex);
        
                    elements.forEach(element => {
                        element.classList.remove(activeClass)
                    })
                    e.target.classList.add(activeClass)
        
                    calcTotal();
                })
            })
        }
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getDynamicImformation(selector) {
            const input = document.querySelector(selector)
    
            input.addEventListener('input', () => {
                
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break
                    case 'age':
                        age = +input.value;
                        break      
                }
            calcTotal();
            })
        }
        getDynamicImformation('#height')
        getDynamicImformation('#weight')
        getDynamicImformation('#age')
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

;

function cards() {
    //Использование классов
    const containerMenuField = document.querySelector('.menu .container')

    class MenuItem {
        constructor(imgName, itemSubt, itemDescr, itemPrice, ...classes) {
            this.imgName = imgName
            this.itemSubt = itemSubt
            this.itemDescr = itemDescr
            this.itemPrice = itemPrice
            this.classes = classes
        }
        render() {
            const div = document.createElement('div');
            if(this.classes.length === 0) {
                this.div = 'menu__item'
                div.classList.add(this.div)
            }
            else {
                this.classes.forEach(className => div.classList.add(className))
            }
            div.innerHTML = `
            <img src="img/tabs/${this.imgName}.jpg" alt="${this.imgName}">
            <h3 class="menu__item-subtitle">${this.itemSubt}</h3>
            <div class="menu__item-descr">${this.itemDescr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.itemPrice}</span> грн/день</div>
            </div>`;
            containerMenuField.append(div)
        }

    }
   
     /*const getResource = async (url) => {
        const res = await fetch(url)

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    //ВАРИАНТ 1 (с использованием классом)
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(obj => {
    //         new MenuItem(obj.altimg, obj.title, obj.descr, obj.price*40, "menu__item").render()
    //     })
    // })  
    
    /* ВАРИАНТ 2
    getResource('http://localhost:3000/menu')
    .then(data => createCard(data))

    function createCard(data) {
        data.forEach(obj => {
            const element = document.createElement('div')
            element.classList.add('menu__item')
            element.innerHTML = `
            <img src="img/tabs/${obj.altimg}.jpg" alt="${obj.altimg}">
            <h3 class="menu__item-subtitle">${obj.title}</h3>
            <div class="menu__item-descr">${obj.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${obj.price*40}</span> грн/день</div>
            </div>`            
        document.querySelector('.menu .container').append(element)
        })
    }
    */
    /* ВАРИАНТ 3 */

    axios.get('http://localhost:3000/menu')
    .then(data => {
            data.data.forEach(obj => {
                new MenuItem(obj.altimg, obj.title, obj.descr, obj.price*40, "menu__item").render()
            })
        })


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

;

function forms(formSelector, modalTimerId) {
    //FORMS

    const forms = document.querySelectorAll(formSelector)

    const message = {
        loading:"img/form/spinner.svg",
        success:"Спасибо, скоро мы с вами свяжемся",
        failture: "Что-то пошло не так..."
    }
    forms.forEach(item => {
        bindPostData(item);
    })



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
           // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage) // более гибкая настройка

            //const request = new XMLHttpRequest(); // xml запрос (старый формат, сейчас не актуален)
            //request.open('POST', 'server.php'); // xml запрос (старый формат, сейчас не актуален)
            //request.setRequestHeader('Content-type', 'multipart/form-data'); // xml запрос 
            // setRequestHeader не использовать вместе сXMLHttpRequest // xml запрос
            //request.setRequestHeader('Content-type', 'multipart/json');
            /*const object={}; // xml запрос
            formData.forEach(function(value, key){
                object[key]=value;
            })
            const json = JSON.stringify(object)*/

             /*request.send(json); // xml запрос
            request.addEventListener('load', ()=>{  // xml запрос
                if (request.status === 200) {
                    console.log((request.response));
                    showThanksModal (message.success);
                    form.reset();
                    statusMessage.remove();
                }
                else {
                    showThanksModal (message.failture);
                }
            })*/
                       
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log((data));
                showThanksModal (message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failture) // не переходит в состояние "отклонено", свойство статус 
                //становится false
            })
            .finally(() => {
                form.reset();
            })           
        })        
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
        prevModalDialog.classList.add('hide') // скрыли предыдущий контент
        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal)
        setTimeout(()=> {
            thanksModal.remove()
            prevModalDialog.classList.add('show') // показали предыдущий контент
            prevModalDialog.classList.remove('hide') // показали предыдущий контент
            ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal')
        }, 4000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/links.js":
/*!*****************************!*\
  !*** ./js/modules/links.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function links() {
    const delivery = document.querySelectorAll(".header__link");
    const dailyMenu = document.querySelector(".menu .title");

    const calcKkal = document.querySelector(".calculating .container .title");
    console.log(delivery);

    delivery[0].addEventListener("click", (e) => {
        e.preventDefault();
        dailyMenu.scrollIntoView({ behavior: "smooth" });
    });
    delivery[1].addEventListener("click", (e) => {
        e.preventDefault();
        calcKkal.scrollIntoView({ behavior: "smooth" });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (links);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalButtons = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalButtons.forEach((btn) => {
        btn.addEventListener("click", () =>
            openModal(modalSelector, modalTimerId)
        );
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    //scrollModal
    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //TABS
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector)

    function hideTabContent() {
    tabsContent.forEach (item => {
        item.classList.add('hide')
        item.classList.remove('show', 'fade')
    })
    tabs.forEach(item => {
        item.classList.remove(activeClass)
    })    
    }
    function showTabContent (i=0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add(activeClass)
    }
    hideTabContent()
    showTabContent()
    tabsParent.addEventListener('click', (event)=> {
    const target = event.target;  //чтобы не повторяться 

    if(target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item,i) => {
            if(target == item) {
                hideTabContent()
                showTabContent(i)
            }
        })
    }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function timer(id) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    const promoDate = document.querySelector("#promotion_date");

    const dataTomorrow = new Date(new Date().getTime() + 86400000);

    const month = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];

    promoDate.textContent = `${dataTomorrow.getDate()} 
    ${month[dataTomorrow.getMonth()]}`;

    setClock(id, dataTomorrow.toDateString());
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });


const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers : {
            'Content-type': 'application/json'
        },
        body: data
    })
    return await res.json();
}

const getResource = async (url) => {
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_links__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/links */ "./js/modules/links.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











window.addEventListener("DOMContentLoaded", () => {
    //TimerModal

    const modalTimerId = setTimeout(
        () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)(".modal", modalTimerId),
        50000
    );
    (0,_modules_links__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])("[data-modal]", ".modal", modalTimerId);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])(
        ".tabheader__item",
        ".tabcontent",
        ".tabheader__items",
        "tabheader__item_active"
    );
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])(".timer");
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map