'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// 📌 Page navigation
// 1️⃣ nav 요소 안에 세가지 버튼을 각각 눌렀을 때, 알맞은 요소로 부드럽게 페이지 스크롤되는 기능 추가
// 👉 scrollIntoView({behavior: 'smooth'}) 이용
// 근데 만약 이렇게 페이지 스크롤을 요구하는 버튼이 1000개가 넘는다면? 이런걸 그만큼 반복해야 되므로
// 우리는 버블링 메커니즘을 통한 event delegation(이벤트 위임)을 이용해야 한다!!
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    // console.log('LINK');
    e.preventDefault(); // <a>의 기본동작(href와 동일한 Id값을 가지는 요소로 이동) 막음

    const id = this.getAttribute('href'); // absolute한 url말고(this.href), Relative한 링크 필요(html 문서에 입력한 href 자체)!
    console.log(id); // #section--1 / #section--2 / #section--3
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// 1️⃣ Event delegation (이벤트 위임 - 부모에서 자식으로, 이게 가능한 이유는 자식에서 부모로 이벤트가 전파되므로.)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // this가 아닌, e.target으로 바꿔줘야 함. (위의 코드처럼 자식요소인 nav__link에서 이벤트리스너를 불러오는 것이 아니라, 자식에서 부모로 이벤트가 전파된다는 이벤트 버블링 메커니즘을 이용해 자식요소를 모두 감싸는 부모 요소(nav__links)에서 이벤트리스너를 불러왔고, 여기선 this가 아닌, e.target이 실제 이벤트가 실행된 요소, 즉 자식요소에 해당하기 때문.)
    console.log(id); // #section--1 / #section--2 / #section--3
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// 📌 어플리케이션 조작!!
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  // getBoundingClientRect() : relative to the visible view port.

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // 1) Old way
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.left + window.pageXOffset
  );

  // 2) Old way
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.left + window.pageXOffset,
    behavior: 'smooth',
  });

  // 3) latest way
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*
// Types of events and event handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1);
  // 👉 이벤트가 불러와지고 나서 바로 삭제되므로 이벤트를 딱 한번만 부르고 싶을 때 쓰면 좋은 패턴!
};

h1.addEventListener('mouseenter', alertH1);

// 👉 타이머 함수를 이용해서 3초 뒤에 이벤트가 삭제되도록 할 수 있음.
setTimeout(() => h1.removeEventListener('mouseenter, alertH1'), 3000);
*/

// 📌 DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
// querySelector() also works on elements, not only on the document.
console.log(h1.querySelectorAll('.highlight')); // NodeList(2)
// querySelectorAll(): 해당 클래스를 가지는 요소가 h1 안에 얼마나 깊이 있는지 상관없이, 모든 hightlight 클래스를 가지는 요소 선택함!

console.log(h1.childNodes); // NodeList(9) : 구체적인 노드 타입인 comment/text/element를 모두 반환! (Nodes자체를 리턴하니까 노드타입 모두 반환하는 거다...)
console.log(h1.children); // HTMLCollection(3) : <span>, <br>만 반환!
// 얘는 이제 노드타입 전체가 아닌, element 타입만 반환!!

h1.firstElementChild.style.color = 'white'; // 바로 위의 Children에서 불러온 가장 첫번째 element인 <span>의 텍스트 컬러를 흰색으로 바꾼다.
h1.lastElementChild.style.color = 'pink';

// Going upwards: parents
console.log(h1.parentNode); // div.header__title (직접적인 부모노드를 반환 - element가 아니어도 반환.. 즉 텍스트노드와 주석노드까지 포함 => 보통 잘 안쓰므로 parentElement에 집중하자🖍️)
console.log(h1.parentElement); // div.header__title (부모가 element일때만 반환)
// 이 두가지 프라퍼티는 항상 직접 부모만 반환하며, 멀리 떨어진 부모를 찾지 않는다. 하지만..
// 대부분의 경우 direct parent보다, 아무리 멀리 떨어져 있어도 가장 멀리 있는 부모요소를 선택해야 하는 경우가 많다.. => 이벤트 버블링이 가능하기 때문에, 무조건 부모요소가 더 넓은 범위를 포괄하고 있어도 자식 입장에서 상관없고, 우리에겐 closest() 함수가 있기 떄문ㅎㅎ

// 💫 closest() 함수 => querySelector()과 반대로 동작하는 함수라고 생각!
// 두 함수 모두 'query string'을 인풋으로 받는데, queryselector()은 자식요소를 찾고,
// closest()는 반대로 부모요소를 찾기 때문 & 돔트리가 얼마나 깊은지와 상관없이, 직계부모/자식만
// 찾는 것이 아닌, 엄~~청 멀리 떨어져 있는 부모나 자식을 찾아서 리턴해버리니까 ...(이 말은 찾을 수 있다는 뜻이지, 가장 멀리 있는 걸 찾는다는게 아님. 실제로 가장 "가까운" 부모요소를 리턴함!)

// closest() 함수는 특정 셀렉터와 일치하는 가장 가까운 조상 요소를 반환합니다. 이는 DOM 트리에서 위로 탐색하며, "가장 가까운 부모부터 시작해 일치하는 요소"를 찾습니다. 즉, "직계 부모"만을 찾는 게 아니라, 일치하는 "가장 가까운 부모"를 찾기 때문에, 💥실제로 직접 부모일 수도 있고, 멀리 떨어진 부모일 수도💥 있습니다.

// h1.closest();
// 👉 h1에서 "가장 가까운" 부모요소인데, heade라는 클래스명을 가지는 부모요소를 리턴해라.
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// 가장 가까운 부모요소 중에 'Header'라는 클래스명을 가진 요소의 배경색을 바꿔라.

// Going sideways: siblings
console.log(h1.previousElementSibling); // null => 중요 ✅
// header-title요소의 가장 첫번째 자식요소이므로 당연히 Null
console.log(h1.nextElementSibling); // <h4></h4> => 중요 ✅

console.log(h1.previousSibling); // #text => 잘 안쓰임 ❌
console.log(h1.nextSibling); // #text => 잘 안쓰임 ❌

console.log(h1.parentElement.children); // 자기자신을 포함해 모든 자식요소 겟하려면 ..
// parent element를 선택한 후, Children을 선택하면 모든 자식요소를 겟할수 있다.

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
