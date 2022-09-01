'use strict'
import {getResource} from '../services/services'

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

export default cards;