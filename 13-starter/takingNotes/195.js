// 195. Passing Arguments to Event Handlers
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

// 195. Passing Arguments to Event Handlers
// Menu fade animation

// 2️⃣ Second version of our code working
const handleHover = function (e) {
  console.log(this, e.currentTarget); // It's either 1, 0.5.
  // By default, this keyword = current target = navigation element (class="nav")
  // = The element on which the event listener is attached to. (equal to)
  // but when we then set this keyword manually, it becomes whatever we set it to.
  // >> ❌So now, just like before, we can use this keyword in the same way as an opacity.

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

// // 💥 It's not gonna work because
// // 1. first problem is e is not defined.
// // 2. second problem is addEventListener expects a function!
// // so we need to pass a fucntion not a value.
// // This case it's undefined, because we don't return anything...
// nav.addEventListener('mouseover', handleHover(e, 0.5));
// nav.addEventListener('mouseout', handleHover(e, 1));
// // The solution to this problem would be to still have a callback function.

// // 👉 Here's only way of making this work, so this will only be executed
// // as soon as JS executes this function value.
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Passing "argument"(really not an argument) into handler

// 🔥 Actually, we can make these codes even better!
// bind: new function를 리턴하기 때문에 addEventListener가 take할 수 있기 때문에!
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// ❌ It's impossible to pass another argument into an eventHandler function..
// >>> 맨 위의 handleHover 함수의 두번째 파라미터인 opacity를 지움
// Any handler function can only ever have one real argument.(parameter)
// But if we want to pass additional values into the handler function,
// then we need to use the this keyword, of if we wanted to pass multiple
// values, we could of course pass in here, like an array or an object instead of just one value.
// ✅ It taught us how we can pass arguments into handler function.

// 1️⃣ First version
// // Of course we don't want to attach an Eventlistener to each of these links.
// // so we already know that we should do 🌟event delegation🌟 here instead.
// // Let's use this entire navigation as our parent container (class = "nav")
// // on which we will handle the event that's gonna bubble up from the links.
// // const nav = document.querySelector('.nav');
// // ❗️ Let me put this here at the very top cause we're gonna use it a bit later.
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     // 💥 This time, I'm not using closest method becasue there are simply no child elements
//     // that we could accidentally click in this link.
//     // No.172: tabs element 안에 위치한 span element를 클릭할 때도 코드를 적용시켜야 했기 때문.
//     // But here that's not necesssary!

//     const link = e.target; // creating variable which contains the element that we're working with.
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     // nav대신, another parent인 nav_links로 해도 되지만 choosing an even higher up parent한 방법을 택해도 No problem.
//     // > Then we are now at a parent of all of the links, and so now from there,
//     // we can search for the nav_links again.
//     // These are gonna be the siblings of our initial links.
//     // 👉 we can use querySelector on an element to search for a certain query only in that element.
//     const logo = link.closest('.nav').querySelector('img');
//     // ✅ We have all our elements selected now we just need to change the opacity.

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// // 다음과 같은 코드 없이는, it won't automatically go back to the capacity of 1 which is the original one.
// // So when I hover this, all the others become 0.5, but as I move out, then everything remains the same.
// // That's why we have this mouseout event. To basically undo what we have here.

// // 📍 logo에서는 적용되지 않는 이유는..
// // this entire effect only works if the target contians the nav_link class.
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     // 💥 This time, I'm not using closest method becasue there are simply no child elements
//     // that we could accidentally click in this link.
//     // No.172: tabs element 안에 위치한 span element를 클릭할 때도 코드를 적용시켜야 했기 때문.
//     // But here that's not necesssary!

//     const link = e.target; // creating variable which contains the element that we're working with.
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     // nav대신, another parent인 nav_links로 해도 되지만 choosing an even higher up parent한 방법을 택해도 No problem.
//     // > Then we are now at a parent of all of the links, and so now from there,
//     // we can search for the nav_links again.
//     // These are gonna be the siblings of our initial links.
//     // 👉 we can use querySelector on an element to search for a certain query only in that element.
//     const logo = link.closest('.nav').querySelector('img');
//     // ✅ We have all our elements selected now we just need to change the opacity.

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });
*/
