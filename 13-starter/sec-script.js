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
    e.preventDefault(); // <a>의 기본동작 (= href와 동일한 Id값을 가지는 요소로 이동) 막음

    const id = this.getAttribute('href'); // absolute한 url말고(this.href), Relative한 링크 필요(html 문서에 입력한 href 자체)!
    console.log(id); // #section--1 / #section--2 / #section--3
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// 1️⃣ Event delegation (이벤트 위임 - 부모에서 자식으로, 이게 가능한 이유는 자식에서 부모로 이벤트가 전파되는 이벤트 버블링 덕분.)
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
  // getBoundingClientRect() : relative to the visible 'viewport'

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // pageYOffset: distance between the current position of the view port and at the top of the page. 단순하게 위아래로 얼마나 내려왔는지 체크해주는 속성. 많이 내려올수록 값이 큼!!

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // current portion of the page = height and width of viewport.

  // Scrolling
  // 1) Old way
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );
  // 💥left, top: page(document)가 아닌, 현재 보이는 부분인 viewport를 기준으로 하기 때문에, 맨 위에서 눌렀을 때만 올바르게 작동하고, 조금만 스크롤해서(y값 ⬆️, 내려와서) 누른다면, 페이지가 아닌, 뷰포트 기준으로 하기 때문에 s1coords.top은 스크롤해서 내려온만큼 작아져, 아주 조금만 스크롤되게 된다(?) 따라서 우리는 스크롤한 부분만큼! 더해준 값을 지정해야 하는 것.

  // 자세한 설명: getBoundingClientRect()는 요소의 위치를 현재 보이는 뷰포트 기준으로 계산해줍니다. 그래서 s1coords.top 값은 뷰포트 상에서의 요소의 위치를 나타내기 때문에 페이지 전체의 스크롤 양에 따라 다르게 나타날 수 있습니다.
  // 만약 페이지가 스크롤 되지 않은 상태에서 실행되면 이 값은 페이지의 전체기준으로도 맞게 계산되지만, 스코롤된 상태라면 뷰포트상에서만의 위치를 나타내므로 올바른 위치로 스크롤 되지 ❌

  // 2) Old way (object 형식, smooth하게 이동 가능)
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
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
// 👀 querySelector() also works on elements, not only on the document.
console.log(h1.querySelectorAll('.highlight')); // NodeList(2)
// querySelectorAll(): 해당 클래스를 가지는 요소가 h1 안에 얼마나 깊이 있는지 상관없이, 모든 hightlight 클래스를 가지는 요소 선택함!

console.log(h1.childNodes); // NodeList(9) : 구체적인 노드 타입인 comment/text/element를 모두 반환! (Nodes를 리턴하니까 노드타입 모두 반환하는 거다...)
console.log(h1.children); // HTMLCollection(3) : <span>, <br>만 반환!
// 얘는 이제 노드타입이 (=NodeList)가 아닌, element 타입만 반환!!

h1.firstElementChild.style.color = 'white'; // 바로 위의 Children에서 불러온 가장 첫번째 element인 <span>의 텍스트 컬러를 흰색으로 바꾼다.
h1.lastElementChild.style.color = 'pink';

// Going upwards: parents
console.log(h1.parentNode); // div.header__title (직접적인 부모노드를 반환 - element가 아니어도 반환.. 즉 텍스트노드와 주석노드까지 포함 => 보통 잘 안쓰므로 parentElement에 집중하자🖍️)
// => 잘 안쓰임 ❌
console.log(h1.parentElement); // div.header__title (부모가 element일때만 반환)
// => 중요 ✅ (Element를 가져옴)
// 이 두가지 프라퍼티는 항상 직접 부모만 반환하며, 멀리 떨어진 부모를 찾지 않는다. 하지만..
// 대부분의 경우 direct parent보다, 아무리 멀리 떨어져 있어도 가장 멀리 있는 부모요소를 선택해야 하는 경우가 많다.. => 이벤트 버블링이 가능하기 때문에, 무조건 부모요소가 더 넓은 범위를 포괄하고 있어도 자식 입장에서 상관없고, 우리에겐 closest() 함수가 있기 떄문ㅎㅎ

// 💫 closest() 함수 => querySelector()과 반대로 동작하는 함수라고 생각!
// 두 함수 모두 'query string'을 인풋으로 받는데, queryselector()은 자식요소를 찾고,
// closest()는 반대로 부모요소를 찾기 때문 & 돔트리가 얼마나 깊은지와 상관없이, 직계부모/자식만
// 찾는 것이 아닌, 엄~~청 멀리 떨어져 있는 부모나 자식을 찾아서 리턴해버리니까 ...(이 말은 찾을 수 있다는 뜻이지, 가장 멀리 있는 걸 찾는다는게 아님. 실제로 가장 "가까운" 부모요소를 리턴함!)

// closest() 함수는 특정 셀렉터와 일치하는 가장 가까운 조상 요소를 반환합니다. 이는 DOM 트리에서 위로 탐색하며, "가장 가까운 부모부터 시작해 일치하는 요소"를 찾습니다. 즉, "직계 부모"만을 찾는 게 아니라, 일치하는 "가장 가까운 부모"를 찾기 때문에, 💥실제로 직접 부모일 수도 있고, 멀리 떨어진 부모일 수도💥 있습니다.

// h1.closest();
// 👉 h1에서 "가장 가까운" 부모요소인데, header라는 클래스명을 가지는 부모요소를 리턴해라.
h1.closest('.header').style.backgroundColor = 'var(--gradient-secondary)';
// 가장 가까운 부모요소 중에 'Header'라는 클래스명을 가진 요소의 배경색을 바꿔라.

// Going sideways: siblings
console.log(h1.previousElementSibling); // null => 중요 ✅ (Element를 가져옴)
// header-title요소의 가장 첫번째 자식요소이므로 당연히 Null
console.log(h1.nextElementSibling); // <h4></h4> => 중요 ✅

console.log(h1.previousSibling); // #text => 잘 안쓰임 ❌ (Node를 가져옴)
console.log(h1.nextSibling); // #text => 잘 안쓰임 ❌

console.log(h1.parentElement.children); // 자기자신을 포함해 모든 자식요소 겟하려면 ..
// parent element를 선택한 후, Children을 선택하면 모든 자식요소를 겟할수 있다.

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

// 📌 Tabbd component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// ⛔️ This is not a good practice.. What if we had like 200 tabs?
tabs.forEach(t =>
  t.addEventListener('click', () => {
    console.log('TAB');
  })
);

// ✅ Use events delegation!
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //
  console.log(clicked); // 실제 클릭 이벤트가 일어난, 우리가 클릭한 버튼 element 선택
  // 🚨 이때, 버튼이 아닌 span요소를 클릭했을 때도, 버튼 요소를 가져오게 하려면, closest()함수를
  // 사용한다. => btn이 어쨌든 span을 감싸는 부모요소니까, operations__tab 클래스를 가지는 즉 버튼요소를 가져오게 하면서 span이 클릭되든, 버튼이 클릭되든 무조건 버튼요소를 가져올 수 있는 것!

  // 버튼이 아닌 tabsContainer 영역을 클릭하면 null 출력! (상위요소로서 operations__tab이 없기 때문)
  // 📌 Guard clause: 아래처럼 쓰는 것보다, {} 굳이 블록 하나를 더 만들 필요 없이 더 모던하게 쓸 수 있는 방법. = clicked된게 없다면(=null=falsy value), 우리는 이 함수를 즉시 끝내버리고 싶고, clicked된게 있다면(버튼 클릭), return이 실행되지 않고, 나머지 코드가 실행됨.
  if (!clicked) return;

  // 📌 Active tab: 클릭이벤트가 일어날 떄마다 일단 액티브를 제거한 다음(내린다음) 해당 클릭 버튼만 올리기! (초기화 후 세부조정)
  // 💥 First, you need to remove 'active class' from all of tabs.
  // * querySelector -> NodeList -> ✨can use forEach method✨
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // 📌 Activate content area
  console.log(clicked.dataset.tab); // 1 | 2 | 3
  // 💥 First, you need to remove 'active class' from all of tabsContent.
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  // 💫 Guard clause
  //   if (clicked) {
  //     clicked.classList.add('operations__tab--active');
  //   }
});

// Menu fade animation (9/23)
// : nav에 있는 링크(버튼)들을 Hover했을 때,(mouseover) 하버된 링크 제외한 나머지 링크들을 fade out
// 이것도 마찬가지로, 각각의 링크 위에 이벤트리스너를 다는 게 아니라, 이벤트 위임을 이용하기 위해 부모요소 상에 달아준다!!
// ✅ Use events delegation!
const nav = document.querySelector('.nav');

/* 💛
// it's similar to mouseenter but mouseenter doesn't bubble.
// So we MUST use mouseover.
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // <li class='nav__item'> 안에는 링크(<a class='nav__item'>) 이외에 다른 child node가 없으므로 closest() 사용할 필요 ❌
    // 따라서 그냥 클릭된 요소가 링크 클래스(nav__link)를 가지고 있다면,, 그 요소를 link라 칭하자.

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // 1) closest(): nav__links라는 ul 부모요소가 존재하지만, closest() 함수는 직계 부모를 가져오는 것이 아닌, 멀리 떨어져 있어도 해당 클래스를 가지고 있는 부모요소를 리턴하기 때문에 괜찮다...

    // 2) querySelectorAll(): hover된 자기자신을 제외한 나머지 형제 링크들을 선택!!
    const logo = link.closest('.nav').querySelector('img');
    // querySelector()로는 요소의 태그 자체를 삽입해서 셀렉할 수 있다!!
    // 👉 getElementBy~ 머시기와는 다르게 클래스 네임 자체를 이용해 셀렉할 수 있는 것!
    // 🖍️ 밑의 예시는 대괄호 안에 속성 이름과 값을 지정하여, 특정 속성을 가진 요소를 선택한 것 (속성선택자)
    // 🖍️ :checked: 체크된 상태의 요소를 선택하는 가상클래스로서, 주로 체크박스나 라디오버튼처럼 선택된 상태를 의미하는 요소들에 사용됨.
    // Ex) const inputGender = document.querySelector('input[name="gender"]:checked');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = 0.5;
      }
      logo.style.opacity = 0.5;
    });
  }
});

// it's similar to mouseleave but mouseleave doesn't bubble.
// So we MUST use ✨mouseout✨.
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = 1;
      }
      logo.style.opacity = 1;
    });
  }
});
*/

// event handler함수는 오직 하나의 매개변수(인수)만 가질 수 있다.
// => opacity 지워줌!! (this로 바꿔주어 어차피 필요없음)
const handleHover = function (e) {
  console.log(this); // 0.5 or 1
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// 💛 Refactoring codes above
// 📌 196. Passing 'argument' into handler (Use bind method!)

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// 핸들러 함수 상에 bind method를 이용해 this -> opacity로 설정.
// 이때, this는 아무 타입의 데이터나 this로 설정할 수 있다!!

/*
// 📌 197. Sticky Navigation = section1에 달했을 때, nav(title)부분을 보이게 하고 싶다!(fixed)
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // 2️⃣ 대신 우리는, getBoundingClinetRect() 메서드를 통해  section1이 브라우저 상에서 얼마만큼 아래로 떨어져있는지에 대한 밸류 (= top property value)을 도출!

window.addEventListener('scroll', function () {
  console.log(window.scrollY); // 1️⃣ viewport 기준이므로, visible한 브라우저 크기에 따라 section1에 닿을 때의 scrollY값이 브라우저 크기가 달라질 때마다 변하므로 특정 숫자에 달했을 때라는 조건 사용 못함!! (컨솔창을 늘리면, 그에 따라 뷰포트창의 크기가 달라지므로, scrollY 좌표값이 바뀌기 때문) => we need to calculate dynamically!!

  // initialCoords.top = first section from the top.보다 밑으로 스크롤된 정도가 더 많으면, 즉 섹션1이 보일 때, Nav이 보이게 하고 싶은 거니까 이때보다 밑으로 내려가는 순간 보이게 하는것!!
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // => 이렇게만 작성해도 잘 작동은 하지만, Scroll 이벤트는 순간순간마다 컨솔 상에 출력되므로 이건 코드 performance에 좋지 않음! (특히 모바일이나 성능이 떨어지는 핸드폰에서는 더욱더..)
  // => Better and way more efficient tool = intersection of server API.
});
*/

// 📌 198. Sticky Navigation with a better way : The intersection Observer API
/*
// What is an intersection Observer API? and why is this helpful?
// observer 매개변수는 생략 가능!
const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
  // entries = an array of the threshold
  // 뷰포트(root=null)의 10%(threshold=0.1)를 가로지를 때마다, entry가 출력!
};
// This callback function will get called each time that the observed element(=target element = section1) is intersecting the root element at the threshold that we defined. (= 타겟으로 하는 요소가 루트 요소(여기서는 뷰포트)에서 우리가 정의한 만큼의 threshold(%)정도만큼 차지했을 때 이 콜백함수가 불러와진다.)

// 🌟 isIntersecting: true/false는 마우스 스크롤 방향에 따라 달라짐! => if-else사용하여 sticky navigation 설정 가능하게 해주는 중요한 속성 🌟
// 10%만큼 차지하게 되는 순간 intersecting : true이며, 10% 미만으로 차지하는 순간 Intersecting: false로 출력된다. 이는 차지하게 되는 순간의 스크롤 방향이 타겟 요소로 향하는 방향이므로 true이며, threshold보다 적게 차지하게 되는 순간부터는 타겟 요소를 벗어나는 방향으로 스크롤하는 것이므로 false로 나오는 것이다. (우리가 scrolling up or down하는지는 상관없이 불러와진다)
const obsOptions = { root: null, threshold: [0, 0.2] };

// 1️⃣ root property = element that the target element(=section1) is intersecting.
// root = null : we're lookign for the viewport❗️=> array로 specify할 수 있다.
// ✅ we will be able to observe our target element intersecting the entire viewport.(which shows the current portion of the page)
// ✅ [0, 0.2]: 0 - 타겟 요소가 뷰포트를 완전히 벗어날 때와 진입할 때마다 callback이 발생한다.

// 2️⃣ threshold = % of intersection at which the observer callback will be called. or % that we want to have visible in our root.
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // section1 = target element가 root를 intersecting하는 지 section1을 observe하도록 observer에게 명령하는 코드
*/

// 💥본격적으로 위의 new IntersectionObserver()함수를 Sticky navigation을 만들 수 있도록 적용해보자!!
// 📌 When do we want our navigation to become sticky??
// we want that to happen when the header moves completely out of the view.
// header가 뷰포트(root : null)를 0% 가로지를 때(=차지할 때), 일어나게 하고 싶은 것이므로 Threshold: 0
// nav: header 맨 위에 있는 바 / header: 페이지 맨 위에 차지하는 섹션

// header element를 Observe할 것이므로 일단 헤더 요소 선언.
const header = document.querySelector('.header');

// ⛱️ 반응형 웹의 경우, 브라우저 사이즈마다 nav의 높이가 달라질 것이므로, 높이 또한 다이나믹하게 변경될 수 있게 변수로 지정하자!
const navHeight = nav.getBoundingClientRect().height; // ⛱️

const stickyNav = function (entries) {
  const [entry] = entries; // = entries[0]... threshold가 하나밖에 없으므로
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // ✅ scrolling direction(스크롤하는 방향)에 따라 nav를 sticky하게 할지 말지 결정 가능!!
  // 1. target요소(헤더)가 intersecting하고 있지 않을 때(=false일 때 = 헤더로부터 scroll down하는 방향으로 뷰포트를 가로지를 때 = 헤더가 그 방향으로 계속 가면 안 보이니까 intersecting 안한다고 생각하면 쉬움.)는 nav바를 sticky하고 싶다.
  // 2. 반대로 헤더쪽으로 scroll up해서 헤더쪽으로 이동할 때는 intersecting: True로 뜨며, 이때는 nav바를 더이상 sticky하지 않게 하고 싶다.
};

// header element를 Observe할 것이다! => 위에서 section1Observer라고 썼어도 makes sense..
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,

  // 📌 navigation이 header를 스크롤해서 완전히 지나치고, section1을 오버랩해서 sticky가 발현되기보다, section1이 시작하기 전에 header부분에서부터 navigation이 sticky되어 보여질 수 있도록 하고 싶다면? 이때, navigation의 높이는 90px인 것을 이용하자.
  rootMargin: `-${navHeight}px`, // %, rem 사용 불가 ❌ //  ⛱️
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries; // threshold가 하나밖에 없으므로
  console.log(entry); // 스크롤링 하지 않아도, 컨솔 창에 기본적으로 한번은 무조건 뜸!! => first entry => section1에 대한 컨솔💥

  // 어떤 섹션이 뷰포트를 intersect하는지 알아야 한다 => target 속성 사용
  // entry.target.classList.remove('section--hidden');
  // 🚨 이렇게 해주고 나면, 다 동작이 잘되는 것처럼 보이지만, 첫번째 섹션은 hidden됐다가 보이는것이 아닌, 그냥 원래도 보이는 것처럼 나타남!
  // => 조나스는 first entry가 처음부터 프린트되기 때문이라고 예측.
  // => 💥 기본적으로 한번의 컨솔이 뜰 때, 타겟을 열어보면 section#section--1.section이라고 나타남 & isIntersecting: false인 것을 이용
  // => 우리는 isIntersecting: true일 때만 section-hidden을 제거하여 보이게 하고 싶다.
  // if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
  // 위 코드 대신에, 반대로 쓰는 Guard Clause 쓸 것임!
  if (!entry.isIntersecting) return; // false일 때는 리턴하여 아무일도 일어나지 않게 해라!
  entry.target.classList.remove('section--hidden'); // true일 때는 이 코드를 실행시켜라!

  // 🌟마지막으로 개선할 수 있는 부분🌟
  // 스크롤링 할 때마다 컨솔에 출력되므로, observer한테 unobserve하라고 명령할 필요✅
  // 이때 무엇을 unoberve할지만 써주면 되는데, 당연히 우리는 지금까지 Target(section)을 Observe하여 root(viewport)를 얼마만큼의
  // Threshold만큼 intersectin하는지 관찰한 것이기 때문에 entry.target이라고 써주면 됨!~!
  // => 최초로 타겟요소를 한번 observe할 때는 당연히 컨솔에 출력되지만, 다시 스크롤 업한 뒤에 스크롤 다운해주면 컨솔 창에 아무 일도 ❌
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
