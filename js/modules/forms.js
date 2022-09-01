'use strict'
import {closeModal, openModal} from './modal'
import {postData} from '../services/services'
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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);
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
            closeModal('.modal')
        }, 4000)
    }
}

export default forms;