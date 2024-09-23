// 187. Styles, Attributes and Classes
'use strict';

// 📌 Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// these styles actually set as an 🌟inline styles🌟, so styles set directly here in the DOM.
// >> 이런 식으로 style을 지정하면, HTML에 바로 저장된다. (elements칸에서 바로 바뀐 걸 확인 가능)
// Again, these are called 'inline styles'.

// style(CSS)에 있는 프라퍼티를 출력하기 위해선 🌟inline styles🌟이어야 한다.
// 즉, style property를 이용해 엘러먼트 상에서 불러와줘야 inline style가 되기 때문에,
// 위에서 불러온 backgroundcolor는 출력이 되지만, 🌟그 외의 height/color는 실제
// CSS상에서는 입력이 되어있음에도 불구하고, 빈칸으로 출력🌟되는 것!
// backgorundColor = inline style = a style that we set 🌟manually🌟 ourselves.
console.log(message.style.height); // blank❗️
console.log(message.style.color); // blank❗️
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

// 👉 we can get the styles if we really want to, use the 🌟getComputedStyle🌟 function!
// ✨computed: it's the real style as it appears here on the page
// even if we don't declare it in our CSS.
// console.log(getComputedStyle(message)); // all of the properties with all of the values
// => simply take a certain property
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 49px
// color & height : we didn't define it ourselves,
// but the browser needed to calculate the height to display it and
// so we can then get access to that value.

// height를 높이고 싶다면??
message.style.height = getComputedStyle(message).height + 40 + 'px';
// getComputedStyle(message).height 부분은 string인데, 40(숫자)를 더한다?
// >> 🙅‍♀️ Nothing happened.
// Use function that can take the number out of string❗️
// Number.parseInt / Number.parseFloat
// In this case, it's a floating point number,❌ > parseFloat ✅
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Work with "CSS custom properties" which we usually call "CSS variables"
// CSS 파일 안에 우리가 직접 커스텀한 CSS variable들(color)은 JS에서도 똑같이 변수로서 인식되기 때문에 쉽게 바꿀 수 있다! -> 이때 :root 요소는 JS에서 document를 뜻하므로, 돔 트리 최상위 노드 객체인 document상에서 documentElement를 선택해 가져와 그 위에서 스타일을 바꿔준다. 이때, setProperty라는 메서드 이용!!
document.documentElement.style.setProperty('--color-primary', 'orangered');
// 이렇게 Custom propert를 바꿔야할 경우, 무조건 setProperty 사용해야 한다!
// message.style.width = '120%'; // 이렇게 하는게 애초에 불가능. 어디 위에서 스타일 불러올건데? -> root에 선언됐으므로, documentElement 무조건 필요하다.
// 하지만, 반대는 가능 => setProperty는 backgroundcolor/height/color를 바꿀 때 사용할 수 있다! 하지만 이런 것들은 굳이 setProperty를 사용하기보다, style상에서 바로 바꿔주는게 더 간편하다.
// (선생님은 여기까지만 말했는데 바꿀라면 어쨌든 이것도 getComputedStyle 사용해야 하는 거 아닌가?..)

// 📌 Attributes
// images are supposed to have the "alt" and "src" attributes on them.
// so if we specify them in HTML like this,
// JS will automatically create these property.
const logo = document.querySelector('.nav__logo');
console.log(logo.className); // nav__logo 💥class가 아니라 className!
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:5500/starter/img/logo.png
// 👉 HTML에 있는 똑같은 relative URL을 얻고 싶다면, 밑에 있는 getAttribute를 사용해야 한다.
console.log(logo.getAttribute('src')); // img/logo.png
// Actually, source is different than(to/from) what we have in the HTML.
// This URL of this image 💫absolute URL💫, and the one in HTML is just a
// 💫relative URL💫, so relative to the folder in which the index.HTML file is located.

// 📌 Non-standard
console.log(logo.designer); // undefined (standard property ❌)
// JS will not automatically create a property on the object.
// 👉 There's another way of reading this value from the DOM. (more difficult)
console.log(logo.getAttribute('designer')); // Jonas

// 👉 Attribute value 수정하기
logo.alt = 'Beautiful minimalist logo';
// 👉 Attribute 추가하기 (company = "Bankist")
logo.setAttribute('company', 'Bankist');
// 👉 Attribute 삭제하기
// logo.removeAttribute('company');

// The same is actually true for the href attribute on links.
const link1 = document.querySelector('.twitter-link');
console.log(link1.href); // https://twitter.com/jonasschmedtman
console.log(link1.getAttribute('href')); // https://twitter.com/jonasschmedtman
// both of them were already absolute anyway.

const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href); // http://127.0.0.1:5500/starter/index.html#
console.log(link2.getAttribute('href')); // #

// 📌 Data attributes
// = a "special kind of attributes" that start with the words 'data'.
// it has to start with "data" (ex. data-version-number) => 별점만들기!!
console.log(logo.dataset.versionNumber); // 3.0
// we use "camelCase" while we have the "dash" in the HTML.
// 🌟 We need to transform this here into "camelCase".. 🌟
// we use actually "data attributes" quite a lot when we work with
// the UI and especially when we need to store data in user interface.

// 📌 Classes
logo.classList.add('c', 'j'); // 여러개 한꺼번에 추가 가능
logo.classList.remove('c', 'j'); // 여러개 한꺼번에 삭제 가능
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use❗️=> 기존에 있던 모든 클래스명이 사라지고 오직 얘로만 override되기 때문!
// because this will override all the existing classes and also
// it allows us to "only put 1 class" on any element.
logo.className = 'jonas';
