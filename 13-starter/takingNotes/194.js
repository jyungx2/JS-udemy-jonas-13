// 194. Building a Tabbed Component
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

// 194. Building a Tabbed Component
// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
// >> If we have a lot of elements like over 200 or more,
// it would make us in trouble and we would have 200
// copies of this exact callback function here.
// that would simply slow down the page. >> not at all desirable.
// 👉 Use event delegation!
// we need to attach the event handler on the common parent element
// of all the elements that we're interested in.
// And in our case, that's this tabs container!

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // 💥 버튼을 누를 때 문제 발생 (1️⃣)
  // button element안에서 버튼 안에 있는 숫자는 또 다른 'span element'로서
  // 존재하기 때문에 버튼의 01/02/03같은 숫자 부분을 누르면(버튼을 누르는 것처럼 보여도..)
  // 컨솔 상에 버튼 element가 뜨는 게 아니라, <span>01</span>이라고 뜸.
  // 👉 이 문제를 해결하기 위해서 e.target.parentElement라고 써버리면
  // 숫자를 누를 땐 우리가 원하는대로 버튼 엘러먼트가 뜨긴 하지만,
  // 막상 버튼을 누를 땐 버튼의 parent element인 operations__tab-container가 떠버려 안됨!!
  // 🚩 What we want is to get the button no matter if we click on the span
  // or on the button itself. 👉 closest method (upward)

  // 💥 버튼 바깥의 구역을 눌렀을 때 에러 발생 (2️⃣)
  // Manipulate when clicking outside of the button, nothing happens.
  // tab-container구역에 있지만, 버튼 바깥의 구역을 눌렀을 때
  // null이라고 뜨면서 에러가 발생하는 걸 없애기 위한 작업!
  // >> null이라고 뜨는 이유는 위에서 closest method의 결과로 나타나는 건데,
  // null is the result of the closest method when there's no matching
  // parent element to be found. 따라서 당연히 버튼 바깥의 구역을 누르게 되면
  // parent element는 존재하지 않기 때문에 null 이라고 뜨는 것.
  // 👉 Just basically ingnore any clicks that happen on that area where the result is null.

  // 💡 Guard clause: When there's nothing clicked, then we want to
  // immediately finish this function. (클릭된 게 없으면 이 함수를 끝낸다.)
  // when we have null(faulty value), not faulty will become 'true',
  // and then the function will return none of the code that's after it will be executed.
  if (!clicked) return; //
  // clicked된다면, !clicked = false value이기 때문에 리턴은 실행되지 않아
  // the rest of the code will be executed just fine.
  // Now JS is no longer trying to execute the line of code below.

  // 3️⃣ Remove active classes - 1
  // Let's actually take care of putting all of these other buttons down
  // 한개의 버튼을 클릭하면 이미 클릭되어 올라간 버튼이 다시 내려가게끔 만들어주는 작업..
  // 👉 '어떤 버튼이 클릭될 때마다 액티브 클래스를 추가하기 전에'
  // 💫전체적으로 몽땅 제거한 다음에💫 추가해준다. we should remove this active class.
  // The solution is that before we add this class to anyone, we will simply
  // remove it on all of the tabs.
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // 5️⃣ Remove active classes - 2
  // Finally, we want the other ones to be hidden.(= 3️⃣ Active tab)
  // All we need to do is the same that we did for the tabs.
  // basically removing the active class for all of them
  // before adding it to the one that we're interested in.
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // 2️⃣ Activate tab
  // 🖍️ This is the modern way of writing this. (looks a bit nicer than the one below)
  // because we don't need to create all these additional blocks.
  clicked.classList.add('operations__tab--active'); //
  // 각각 세개의 operations__tab은 operations__tab-active class를 가지고 있음
  // 이건 hover했을 때 moved up(위로 올라가는 모션)되는 효과 > 클래스 리스트로 간단하게
  // 추가해주자! (As we click, you see that it activates basically does tab.)

  // 📍 So, we could have written instead also.
  // This is a more traditional way as we have been doing it all the time.
  // if (clicked) {
  //   clicked.classList.add('oprations__tab-acitve');
  // }

  // 4️⃣ Activate content area (각각 고유의 data-tab number을 가지는 3개의 컨텐츠)
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  // 1/2/3 - data-tab... getting from the data attribute (not use hardcode)
  // 일일이 안 쓰고 각각의 element들이 가지는 고유의 data-tab number가 적용될 수 있도록
  // click됐을 때의 그 엘러먼트의 dataset 중에서 tab number을 선택하도록 해준 것.
  // (<= All these attributes are in the element and then in the dataset property.)
  // So the element was clicked is indeed stored in or variable clicked.
  // So everytime we click the button is then stored in the clicked variable.

  // element를 select한 후, classList로 active 상태를 add해준다
  // 이 클래스의 역할은 css파일에 가면 자세히 알 수 있는데, display property를 바꿔주는 것으로,
  // oprations__content의 display: none(hide)이었던 기본값을 이 코드를 적용시키면
  // display: grid로 바꿔주어 all of these properties를 specify down할 수 있게 하는 것.
});
*/
