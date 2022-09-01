"use strict";

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

export default links;
