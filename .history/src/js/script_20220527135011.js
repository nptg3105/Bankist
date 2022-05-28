"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Scroll Smooth
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Tabbed Component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // console.log(clicked);

  //Remove classes
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((content) => {
    content.classList.remove("operations__content--active");
  });

  if (!clicked) return;

  //Active class
  clicked.classList.add("operations__tab--active");

  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Faded nav

const nav = document.querySelector(".nav");

function handleHover(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");

    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = this;
    });
  }
}

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
