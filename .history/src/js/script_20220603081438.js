"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

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

//Sticky Nav
const initialCoords = section1.getBoundingClientRect();
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

window.addEventListener("scroll", function () {
  if (window.scrollY > initialCoords.top - navHeight) {
    nav.classList.add("sticky");
  }
  if (window.scrollY < initialCoords.top) {
    nav.classList.remove("sticky");
  }
});

//Hamburger Nav
const btnHamburger = document.querySelector(".nav__button");
const navMobile = document.querySelector(".nav-mobile");

btnHamburger.addEventListener("click", function (e) {
  navMobile.classList.toggle("active");
});

const windowWidth = header.getBoundingClientRect();
console.log(windowWidth);
window.addEventListener("resize", function () {
  // let windowWidth = window.style.width;
  // console.log(windowWidth);
});

//Reveal Section
const allSection = document.querySelectorAll(".section");

function revealSection(entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy-load image
const imgTargets = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider
function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnNext = document.querySelector(".slider__btn--right");
  const btnPrev = document.querySelector(".slider__btn--left");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  //Function
  function createDot() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  }

  function activeDot(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  function init() {
    goToSlide(0);
    createDot();
    activeDot(0);
  }
  init();

  //Next Slide
  function nextSlide() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  }

  //PrevSlide
  function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDot(slide);
    }
  });
}

slider();
