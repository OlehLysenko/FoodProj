"use strict";
import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import links from "./modules/links";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    //TimerModal

    const modalTimerId = setTimeout(
        () => openModal(".modal", modalTimerId),
        50000
    );
    links();
    calc();
    cards();
    forms("form", modalTimerId);
    modal("[data-modal]", ".modal", modalTimerId);
    tabs(
        ".tabheader__item",
        ".tabcontent",
        ".tabheader__items",
        "tabheader__item_active"
    );
    timer(".timer");
    slider({
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
