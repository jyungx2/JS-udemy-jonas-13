// 189. Types of Events and Event Handlers
/*
'use strict';

// 1️⃣ mouseenter (click이외에 마우스를 이용하는 방법)
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // 3️⃣ 아래의 코드를 써주면, 처음에 hover할 때만 alert 창이 뜨고,
  // 그 다음에 hover할 때는 뜨지 않는다 (event 삭제!)
  // THis is a nice pattern whenever you only want to
  // listen to any event just once.
  // 그리고 꼭 여기에다 안 써도 된다.⏰
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// ⏰ We could remove it after a certain time has passed.
// 3초 뒤에는 아무리 마우스를 hover해도 alert 기능이 작동X (3초 기준은 최초 hover 뒤 카운팅)
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// 2️⃣ on-event property(=onmouseenter) => This way of listening to events
// is a bit old school ... it used to be done like this in the old days.
// But now we usually always use addEventListener.
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };
*/
