// 199. Lazy Loading Images
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
// 🚩 이미지가 페이지 안에서 최적화되는 것은 매우 중요하다.(optimized)
// because images have by far the biggest impact on page loading.
// >> we can use a strategy called Lazy Loading Images.

// 2️⃣ It appeared a little bit before, because our sections are actually
// a little bit shifted becasue of this hidden class('section--hidden')
// that we added to them. They are shifted 8 rem down.
// css파일에 보면 section--hidden 부분이 transform: translateY(8rem)이라고
// 되어 있다. therefore this event will fire a little bit early.
// (revealSection function에서 entry에 remove 클래스리스트로 이 기능 지워줌)
// 하지만 중요한 건 이게 아니고, event fired correctly & and it's intersecting.

// 1️⃣ The only ones that will be lazy loaded are the ones that have attribute(data-src).
// because that's where we specified the real high resolution picture.
// so we can select 4 elements which contain this property.
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // only one threshold, so only one entry
  console.log(entry);

  if (!entry.isIntersecting) return;

  // 3️⃣ Replace src with data-src
  // As we reach the image, it's finally time to replace the placeholder
  // image, which is at the src, with the one we actually want
  // ,which is data-src.

  entry.target.src = entry.target.dataset.src;
  // 🌟 each of these images is at target or actually at entry.target
  // that's the element that's currently being intersected.
  // 📍 dataset = where these special data properties are stored.
  // 👉 But it's not still happening, cause there's still blurry filter on top.
  // 하지만, inspect상에서 보면, we already see that the src is now actually already
  // the original image.
  // So you see the really big images(original one) when they are in the
  // viewport(=visible) while the other ones are still the lazy ones.

  // 4️⃣ All we need to do is to remove class that has this blurred filter.(=lazy image class)
  // >> a little tricky.. Because JS finds the new images that it should
  // load and display happens behind scenes Once it's finished
  // loading that image, it will emit the load event.
  // 👉 It's best to only remove blurry filter once that's done.
  // You see that now it keeps being blurred and it will only disappear
  // once the image is in fact loaded.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // 5️⃣ As a last step, stop observing these images becasue it's no longer necessary.
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
  // we want to load the images a littl bit before we actually reached them.
  // So ideally, we don't want our users to notice that we are lazy
  // loading these images, So all of this should basically happen
  // in the background without our user noticing that.
  // So we should probably make these images load a little bit earlier.
  // So to do that, we can specify a negative root margin here.
  // So it should already start loading exactly 200px before any of the images is loaded.
});

imgTargets.forEach(img => imgObserver.observe(img));
// All you need to do is to generate these placeholder images
// and blurred them a little bit and then implement this kind of logic
// which really shouldn't be too much work.
// All that's left to implement is really slider!
*/
