// ⚠️강의 들으면서 다시 필기하기 !!!!!!⚠️
// 192. Event Delegation : Implementing Page Navigation
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
  // 1) we need to get the coordinates(좌표) of the element that we want to scroll to.
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // we get to this DOM rectangle which has all of these properties.
  // x position: measured from the left side.
  // y position: measured from the top
  // top position: the position from the top of the viewport.
  // width/height and the other properties

  // Let's get this rectangle for the button.(위에꺼는 이해하기 어려움)
  // 버튼을 클릭할 때 출력하도록 e.target을 이용??
  // e.target = btnScrollTo (essentially this element)
  console.log(e.target.getBoundingClientRect());

  // we can also get the current scroll position.
  // X, Y position values are at window.pageXoffset and pageYoffset.
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // 밑으로만 조금 내렸을 때 x, y축으로 각각 얼마만큼의 px을 움직였는지 알 수 있다.
  // 맨 위에 있을 때(scroll하지 않았을 때) these two values should both be 0.
  // we get that the 🌟current scroll🌟 is at 0 from X,
  // there's no horizontal scroll and vertically, we already
  // scrolled 290 pixels here at this point.
  // > certain application 에서 중요한 요소🖍️

  // we can also read the height and the width of this view port which
  // is a rectangle in which we can see the current portion of the page.
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // console창을 늘려서 visible box의 크기를 대충 반으로 줄이면 width는 그대로지만,
  // height (588 -> half of 588 = about 276)는 반으로 줄어든다!
  // (height of the viewport is of course different.)

  // Scrolling
  // 1️⃣ we determined the absolute position of this element
  // relative to the document.(to the entire page.)
  // => the current position + the current scroll
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  // horizontal scroll은 원하지 않기 때문에 left : 0(in s1coords) 괜찮다.
  // 최초 한 번 클릭하면 우리가 원하는 시작점(s1coords.top)으로 내려가지만,
  // (= we are now here at the top of section here.)
  // 그 다음 한번 더 누르면 it doesn't really work.
  // 이유: top is always relative to the viewpoint not to the document.
  // So not to the top of the page basically.
  // 즉, 맨 위에 위치했을 때(페이지 처음딱 열면 위치하는 그 자리) 누르면 우리가 원하는
  // 위치인 top position에서 떨어져 있는 만큼의 길이만큼(ex. y: 700)밑으로 이동하게 되지만,
  // 기준점은 document(page)자체가 아니라, 우리가 지금 위치해있는 viewpoint에서
  // top position이 결정되는 것이기 때문에, 700보다 더 적은 position값(ex. y: 300)을 갖게 된다.
  // 따라서 700만큼 밑으로 스크롤 되는게 아니라 300만큼밖에 스크롤되지 않아서 우리가 원하는
  // 곳으로 미처 이동시키지 못함!!
  // 👉 The solution to this problem is to simply add the current
  // scroll position to the top value. we will determine the position
  // of the section here, not relative to the viewport.
  // 따라서, the position of the section(우리가 원하는 위치)가 항상 top이 되게끔,
  // 현재 viewpoint가 top에서 떨어진 길이 + 우리가 currently 스크롤한 만큼의 길이를
  // 더해준 값만큼을 스크롤해서 내려주면 우리가 원하는 position으로 이동할 수 있다!!
  // (which is from the position to the viewport plus the current scroll position.)

  // 2️⃣ we can make this even better.
  // To implement smooth scrolling like this,
  // we need to specify an object with the
  // 💫left, top and behavior properties.💫
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 3️⃣ There's more modern way.
  // we simply take the element that we want to scroll to(=section 1),
  // on that, we scroll into view and then we pass in an object and
  // specify again, behavior and set it to smooth.
  // So if we are able to use this function,
  // those weird positions are all unnecessary!
  // >> This only works in modern browsers..
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // 💥 1. anchor 디폴트값: we need to prevent these default behavior.
//     // href="#section--2" - anchor인데, (#name 형태) 이 아이의 디폴트 행동은
//     // anchor와 같은 네임을 id로 가진 섹션으로 자동으로 이동하게 되는 것.
//     // we no longer scroll to the page. & URL bar is actually no longer
//     // changing as we click here. so the problem is fixed!
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }); // 24 code
// });

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
*/
