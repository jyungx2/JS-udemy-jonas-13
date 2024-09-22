// 200. Building a Slider Component : Part 1
// 201. Building a Slider Component : Part 2
/*
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1'); // ID > #
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); // 1️⃣
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy : only selected the link elements itself.
  if (e.target.classList.contains('.nav__links')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return; //

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active'); //

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
// 2️⃣ Second version of our code working
const handleHover = function (e) {
  console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // creating variable which contains the element that we're working with.
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // ❌
    });
    logo.style.opacity = this; // ❌
  }
};

// Passing "argument"(really not an argument) into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// 199. Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // only one threshold, so only one entry
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// 200. Building a Slider Component : Part 1
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('slider__btn--left');
  const btnRight = document.querySelector('slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;
  // We can also read the length property on Nodelist, just like an array.

  // 💡 Keep in mind this has nothing to do with the functionality,
  // This is just we can see what we are doing here.
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // Functions
  // 3️⃣ (201)
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend', // adding it as the last child always.
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // 5️⃣ (201)
  // Before we activated one of them, we first deactivated all of them.
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

    // curSlide = 0, 0%, 100%, 200%, 300%
    // curSlide = 1, -100%, 0%, 100%, 200% (Use curIndex/curSlide)
    // curSlide = -1, 100%, 200%, 300%, 400%
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0; // maxSlide = 4, 4 - 1 = 3번째(마지막 4번째 사진)이
      // curSlide일 때, 오른쪽 버튼을 누르면 curSlide를 다시 첫번째(0번째) 사진으로 이동시킨다.
      // 사진은 총 4장이고, 그 이상으로 더 이상 오른쪽으로 옮기고 싶지 않기 때문!

      // We want the current slide to become 0 again.
      // that's how we return to the beginning of the slides.
    } else {
      curSlide++; // we start at 0 and then when we go to the next slide,
      // we simply increase that by one.

      // otherwise, we'll simply increase the slides by 1.
      // 즉, 사진이 4장이라면, 버튼을 3번 눌렀을 때 마지막 네번째 사진에 도달하므로
      // 버튼을 4번째 눌렀을 때는 다시 처음으로 돌아가야 한다! 따라서 zero-based가 아닌
      // maxSlide(=slides.length)를 읽어줄 때는 -1을 해야 4번째 눌렀을 때 처음으로 돌아간다.
    }
    goToSlide(curSlide);

    // Activate the dot.
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
      // curSlide가 첫번째 사진일 때 왼쪽 버튼을 누르면 가장 마지막 사진으로 이동시킨다.
    } else {
      curSlide--;
    }
    // without this code, we simply keep decreasing the current slide.
    goToSlide(curSlide);

    // Activate the dot.
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // 201. Building a Slider Component : Part 2
  // 2️⃣
  const dotContainer = document.querySelector('.dots');

  // 1️⃣
  document.addEventListener('keydown', function (e) {
    console.log(e); // 왼쪽,오른쪽 화살표 키 = ArrowLeft / ArrowRight
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); // short circuiting
  });

  // 4️⃣
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // console.log('DOT');
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset; // nice use case of destructuring
      // All the custom data attributes are in the 💫dataset.💫
      // ex. data-(value) (여기선 data-slide)

      // basically Go to the slide that we just selected.
      goToSlide(slide);

      // Activate the dot.
      activateDot(curSlide);
    }
  });
};
slider();
*/
