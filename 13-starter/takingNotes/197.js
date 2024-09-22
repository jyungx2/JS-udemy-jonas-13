// 197. A better way: The intersection observer API
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

// 197. A better way: The intersection observer API
// Sticky navigation: Intersection Observer API

// Let's implement the same sticky navigation but using the new intersection observer API.
// API allows our code to basically observe changes to the way that a certain
// target element intersects another element, or the way it intersects the viewport.

// 1️⃣ root: the element that the target(=section 1) is intersecting.
// = target element가 intersect하고싶은 element (=> element를 선택하거나 alternative로서
// null이라고 쓸 수 있다.)
// So we could now here select an element or as an alternative,
// we can write null, and then we will be able to observe our target element
// intersecting the entire viewport, all right?.
// So basically, this entire rectangle which shows the current portion of the page. (웹페이지 전체 뷰)

// 2️⃣ threshold: percentage of intersection at which the observer callback will be called.

// Callback function will get called each time that the observed element,
// so our target element(=section1) is intersecting the root element at the threshold that we defined.
// And fucntion will get called with two arguements (= entries, observer)

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// const obsOptions = {
//   root: null, // ❌ we are looking for the viewport, becasue we set the root to null.
//   threshold: [0, 0.1], // we can have actualy multiple thresholds.
//   // (= entires are actually an array of the threshold entries.)
//   // 섹션1 부분이 10퍼센트만큼 컴퓨터 화면(viewport)에 보이면 callback function이 실행된다.(=intersect한다.)
//   // 즉, threshold는 root안에서 섹션이 보이게 하고 싶은 비율(%)을 말한다.
//   // right now we are back to having less than 10%, and so it is no longer intersecting here.
//   // and again, if we scroll up a little bit more, then we get another event here because now
//   // we are back to having 10% intersection ratio, okay?
//   // 즉, 우리가 보는 뷰포트에 target element(section1) 부분의 10%가 보이기 시작하는 순간과
//   // 10%가 안보이기(없어지기) 시작하는 순간(?)에 각각 callback function이 실행되는데,
//   // 이때 컨솔로 출력되는 값은 각각 isIntersecting: true/false로 출력된다.
//   // 즉, 10%가 보이기 시작하는 (증가추세) 순간에는 intersecting이 true로 출력되고,
//   // 10%가 안 보이기 시작하는 (감소추세) 순간에는 intersecting이 false로 출력된다.

//   // 만약, threshold를 [0, 0.2]같이 범위를 가지는 array로 설정한다면,
//   // 타겟 element가 보이지 않는 순간에도 컨솔 상에 true로 출력되는데 이는 범위 시작점을 0으로 설정해놨기 때문,
//   // 그리고, 스크롤하며 섹션이 20퍼센트 정도 💫보이기 시작💫하는 순간! true로 출력되며
//   // 다시 위로 스크롤하며 섹션이 20퍼센트 보이기 시작하는 지점이 줄어들면서 넘어갈 때 원래 특정 밸류(0.2)로만
//   // 설정해놨다면 false로 떴겠지만, 🖍️이번에는 0~0.2로 설정해놨기 때문에 이 상황에서도 true로 떠서
//   // intersecting이 진행된다. 하지만, 섹션이 끝나는 지점을 지날 때, 섹션으로 들어서냐,
//   // 섹션을 나가느냐에 따라 true/false로 다르게 출력되며 보통 섹션을 들어설 때 true,
//   // 나갈 때 false로 출력되지만, 어레이를 이용해 범위를 설정한다면, 나갈 때도 true가 뜰 수 있다.
// };

// 🤔 When do we want our navigation to become sticky?
// >> When the header moves completely out of view!
// when we can no longer see the header, that's when we want then to display the navigation.
// > 위에 있는 코드를 get rid of 하고 우리가 궁극적으로 만들어야 할 sticky navigation을 만들자.

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
// This works no matter how large or how small the viewport is.

const stickyNav = function (entries) {
  // we don't need observer so we're not gonna specify it.
  const [entry] = entries; // destructuring to get the first element out of entries.
  // = entries[0]이라고 쓰는 것과 똑같다
  // >> we simply get the first one. Don't have to loop over it.
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // when the target isn't intersecting the root(!false=true),
  // then we want the sticky class to be applied.

  // 👉 즉, 헤더가 viewport를 인터섹트하지 않을 때(false)만 스티키 클래스를 추가하고 싶다.
  // 왜냐하면 scroll down할 때 헤더가 더 이상 보이지 않을 때 (threshold=0)
  // 컨솔에 출력되는 entry의 isIntersecting = false로 나오지만,
  // 다시 scroll up해서 올라가면서 헤더가 보이기 시작하는 순간에는, true로 나오게 된다.
  // 👉 따라서 우리는 헤더가 더이상 보이지 않기 시작하는 순간에 스티키를 추가하고 싶은 거기 떄문에
  // isIntersecting 밸류가 false일 때, 'sticky'를 add해주는 것 !!!
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // cause we are again interested in the 💥entire viewport💥
  threshold: 0, // 헤더를 스크롤 다운하면서 내려갈 때(더이상 안 보이기 시작)는 false,
  // 스크롤 업하면서 헤더 쪽으로 다시 올라갈 때(보이기 시작)는 true로 출력.
  // when 0% of the header is visible, we want something to happen.
  // 헤더(target element)가 더이상 화면 상(viewport)에 보이지 않을 때,
  // sticky element가 보이게 하고 싶은 것! (즉, 인터섹트하지 않을 때, )
  rootMargin: `-${navHeight}px`,
  // now the navigation appeared exactly 90 pixels before
  // the threshold was actually reached.
});
headerObserver.observe(header);
*/
