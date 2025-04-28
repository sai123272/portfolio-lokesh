"use strict";

const btnScrollLink = document.querySelectorAll(".scroll-link");
const btnHeaderMobileNav = document.querySelector(".btn-header-mobile-nav");
const btnKnowMore = document.querySelector(".btn--know-more");
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const btnsSideBar = document.querySelector(".side-bar-btns");
const btnSideBar = document.querySelectorAll(".side-bar-btn");
const btnHome = document.querySelector(".btn--1");
const btnPageNavigation = document.querySelector(".pagination");
// const btnPageNumber = document.querySelectorAll(".pageNumber");
// const btn1 = document.querySelector(".btn-page--1");
const btnFooterLogo = document.querySelector(".footer-logo");

const header = document.querySelector(".main-header");
const sectionHero = document.querySelector(".section-hero");
const sectionAboutMe = document.querySelector(".section-about-me");
const joinDate = document.querySelector(".join-date");
const sectionBar = document.querySelector(".my-bar");
const content = document.querySelectorAll(".content");
const contentHome = document.querySelector(".content--1");
const contentCertificates = document.querySelector(".content--2");
const certificates = document.querySelectorAll(".container-certificates");
const uniqueCertificates = document.querySelectorAll(".unique-cert-provider");
const pages = document.querySelector(".pages");
const currentYear = document.querySelector(".current-year");

let clickedSideBarBtn = "";
let clickedPaginationBtn = "";
let pageNumber = 0;
let activePage = 1;
let certPageNo = 1;

// Functions
const dateFormatter = function () {
  let joinedDate = new Date("May 10 2022");
  let currentDate = Date.now();
  let date = currentDate - joinedDate;

  // prettier-ignore
  let dateString = `${Math.ceil(date / (1000 * 60 * 60 * 24 * 30))}`.padStart(2,0);
  // joinDate.textContent = dateString;

  let year = new Date(currentDate);
  // currentYear.textContent = year.getFullYear();
};

const assignPageNumbers = function () {
  uniqueCertificates.forEach((el, i) => {
    if (i !== 0 && i % 3 == 0) certPageNo++;
    el.setAttribute("data-item-no", certPageNo);
  });
};

const createPagination = function () {
  const markup = `
    <button class="pageNumber pagination--next-prev">Prev</button>
    ${generatePageNumbers(certPageNo)}
    <button class="pageNumber pagination--next-prev">Next</button>
  `;
  btnPageNavigation.innerHTML = "";
  btnPageNavigation.insertAdjacentHTML("afterbegin", markup);
  document.querySelector(".btn-page--1").classList.add("click-pagination--bg");
};

const generatePageNumbers = function (pages) {
  let pageMarkup = "";
  for (let i = 0; i < pages; i++) {
    pageMarkup += `
   <button class="pageNumber btn-page--${i + 1}"> ${i + 1} </button>
    `;
  }

  return pageMarkup;
};

const init = function () {
  assignPageNumbers();
  createPagination();
  dateFormatter();
};
init();

const displayCertificates = function () {
  uniqueCertificates.forEach((el) => {
    el.classList.add("hide");
    setTimeout(function () {
      el.classList.add("none");
    }, 300);

    if (+el.dataset.itemNo === activePage) {
      setTimeout(function () {
        el.classList.remove("none");
      }, 300);
      el.classList.remove("hide");
    }
  });
};

// to change page number and its color
const changePageNumber = function (page) {
  document
    .querySelectorAll(".pageNumber")
    .forEach((el) => el.classList.remove("click-pagination--bg"));
  document
    .querySelector(`.btn-page--${page}`)
    .classList.add("click-pagination--bg");
};

// Even Handlers
// Sidebar - Event Delegation
pages.classList.add("none");
btnsSideBar.addEventListener("click", function (e) {
  clickedSideBarBtn = e.target.closest(".side-bar-btn");
  console.log(clickedSideBarBtn);

  // Removing nav-open as we remove side-bar
  sectionBar.classList.remove("nav-open");

  btnSideBar.forEach((el) => {
    if (el != clickedSideBarBtn) el.classList.remove("click-black--bg");
  });
  clickedSideBarBtn.classList.add("click-black--bg");

  // Guard Clause
  if (!clickedSideBarBtn) return;

  // Adding pagination in content--2
  if (clickedSideBarBtn.dataset.btn === "2") {
    // making pagination visible
    pages.classList.remove("none");

    // displaying page1 ofcertificates
    displayCertificates();
  } else pages.classList.add("none");

  // Removing black bg and content from all
  content.forEach((c) => c.classList.add("none"));

  // Adding content
  document
    .querySelector(`.content--${clickedSideBarBtn.dataset.btn}`)
    .classList.remove("none");
});

// Pagination
btnPageNavigation.addEventListener("click", function (e) {
  // Matching strategy 1 for displaying content
  clickedPaginationBtn = e.target.closest(".pageNumber");

  // Guard Clause
  if (!clickedPaginationBtn) return;

  console.log(activePage);
  // concept for clicking button
  if (clickedPaginationBtn.textContent === "Prev") {
    if (activePage != 1) changePageNumber(--activePage);
  } else if (clickedPaginationBtn.textContent === "Next") {
    if (activePage != certPageNo) changePageNumber(++activePage);
  } else {
    activePage = +clickedPaginationBtn.textContent;
    changePageNumber(activePage);
  }

  // Display animation for page content
  displayCertificates();
  scrollTo(sectionBar);
});

// Mobile Navigation
btnMobileNav.addEventListener("click", function (e) {
  sectionBar.classList.toggle("nav-open");
});

btnMobileNav.addEventListener("keydown", function () {
  sectionBar.classList.remove("nav-open");
});

document.body.addEventListener("click", function (e) {
  if (!e.target.classList.contains("icon-mobile-nav"))
    sectionBar.classList.remove("nav-open");
});

btnHeaderMobileNav.addEventListener("click", function (e) {
  document.querySelector("body").classList.toggle("nav-header-open");
});

// Smooth Scrolling
let headerOffset = 81;
// getting href attribute to know the current section to scroll to
const scrollTo = function (target) {
  const currentSection = target;

  // adding header offset as per the section
  currentSection?.classList.contains("section-hero")
    ? (headerOffset = 0)
    : (headerOffset = 80);

  // using scrollTo instead of scrollIntoView because of sticky nav conflict
  window.scrollTo({
    left:
      currentSection.getBoundingClientRect().left +
      window.pageXOffset -
      headerOffset,
    top:
      currentSection.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset,
    behavior: "smooth",
  });
  // .scrollIntoView({ behavior: "smooth" });
};

const smoothScroll = function () {
  btnKnowMore.addEventListener("click", function (e) {
    e.preventDefault();
    scrollTo(document.querySelector(`${e.target.getAttribute("href")}`));
  });

  header.addEventListener("click", function (e) {
    console.log(e.target.closest("a"));
    if (
      e.target.closest("a")?.classList.contains("scroll-link") &&
      !e.target.classList.contains("btn")
    ) {
      e.preventDefault();
      document.querySelector("body").classList.remove("nav-header-open");
      scrollTo(
        document.querySelector(`${e.target.closest("a").getAttribute("href")}`)
      );
    }
  });

  btnFooterLogo.addEventListener("click", function (e) {
    e.preventDefault();
    scrollTo(document.querySelector(`${e.target.getAttribute("href")}`));
  });
};
smoothScroll();

// Sticky Nav
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting)
    document.querySelector("body").classList.add("sticky");
  else document.querySelector("body").classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerOffset}px`,
});
heroObserver.observe(sectionHero);

// Reveal Sections
// const allSections = document.querySelectorAll(".section");

// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry.target.firstElementChild);

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove("section-hidden");
//   observer.unobserve(entry.target);
// };

// const allSectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });
// allSections.forEach((section) => {
//   allSectionObserver.observe(section);
// });