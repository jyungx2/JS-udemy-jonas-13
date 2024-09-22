// 186. Selecting, Creating and Deleting Elements
'use strict';


// 💡 Selecting elements
console.log(document.documentElement);
// entire HTML
// document는 document element를 선택하기에 불충분,
// > 이것은 real DOM element가 아니기 때문! (단지 HTML document상에서
// 어떤 것을 불러온다는 뜻이지, 거기 안에서 특정 element를 불러온다는 건 X)
// 따라서 우리가 CSS style을 페이지에 적용시키고 싶을 때, 우리는 항상
// document상에서 documentElement를 불러와야 한다.
console.log(document.head); // select head in HTML (<head>...</head> )
console.log(document.body); // select body in HTML (<body>...</body>)

const header = document.querySelector('.header');
// select header element > return first element that matches
// this selector(.header) here.

const allSections = document.querySelectorAll('.section');
console.log(allSections); // NodeList(4)

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollections(9)

// 💡 NodeList (👈 returned by querySelectorAll method)와
// vs HTMLCollection (👈 returned by getElementsByTagName selector method)
// 🌟 HTMLcollection is so called 'life' collection
// life... DOM이 컬렉션을 바꾸면(ex. delete) 컬렉션은 💥자동으로 업데이트💥된다는 뜻
// 즉, 인스펙션-버튼을 딜리트로 지우고 나서 다시 컨솔로 가서 allButtons를 읽으면
// 9개의 엘러먼트에서 하나가 지워져 8개의 엘러먼트만 보이는 걸 알 수 있다.
// >> 하지만 이러한 방법으로 Nodelist의 엘러먼트는 제거되지 않는다!!

document.getElementsByClassName('btn');
// this will also return a life HTML collection!
// 즉, 🌟 HTML collection이 유용하게 쓰이는 상황에서만 getElement~ method를 쓰고,
// 보통의 상황에서는 대부분 queryselector(all)을 쓰도록 하자.

// 💡 Creating and inserting elements
// .insertAdjacentHTML : this is used a lot and most.

const message = document.createElement('div');
// document.createElement('') : creates a DOM element ,
// and then stores that element into the message.
// but that element is not yet anywhere in our DOM.
// 이 위에서 뭘 할 수는 있는 DOM object이지만, 하지만 DOM 그 자체에 아직 존재 X
// >> It's nowhere to be found on our webpage.
// if we want it on the page then we need to manually insert it into the page.
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
// innerHTML : we can use innerHTML both to read and set content.. let's not write a string of HTML.
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// All we have to do now is to insert it into our DOM.

// now also really in our DOM!
// prepending adds the element as the 🌟first child🌟 of this element(header).
// >> 1️⃣ 웹페이지의 가장 상단에 메시지 생김
header.prepend(message);
// but we can also edit as the 🌟last child.🌟
// >> 2️⃣ 웹페이지의 가장 하단에 메시지 생김
header.append(message);
// 하지만 이렇게 했을 때, 메시지는 life element(living in the DOM)으로서,
// 동시에 여러 곳에 존재할 수 없고, 한 곳에만 존재할 수 있기 때문에(사람처럼)
// (it can always only exist at one place at a time.)

// 우리가 여기서 한 것은 처음에는 prepended the element and then we appended it.이다.
// 따라서 append가 한 것은 move the element from being the 🌟first child🌟
// to being the 🌟last child.🌟

// 따라서, append가 한것은 element를 insert한게 아니라 🌟move한 것🌟이다. 왜냐하면
// prepend가 🌟이미 insert🌟해놨기 때문에. (it was already inserted by prepend.)
// 👉 우리는 prepend/append method를 element를 insert할 때만 쓸 수 있는 게 아니라,
// 🌟move할 때도 쓸 수 있다는 말!
// That's because a 🌟DOM element is unique. = do m element can only exists
// at aone place at at time.

// what if we actually wanted to insert 🌟multiple copies of the same element🌟?
// 1. first copy the first element.
header.append(message.cloneNode(true));
// true = all the child elements will also be copied.
// 3️⃣ prepend로 인서트한 것을 append로 move하고 싶지 않고
// 똑같은 element를 복제(+2,3개...)하고 싶다면 cloneNode(true)를 사용해라! 
// (이말인즉슨 페이지 위아래로 넣고싶다는 뜻?..이겠지? )

// 4️⃣ header 부분보다 앞쪽에 메시지 위치
// header.before(message);
// 5️⃣ header 부분보다 밑쪽에 메시지 위치
// : we have the whold header and then we have this cookie element.
// header.after(message);

// 💡 Deleting elements
// 메시지 창에 텍스트를 입력하고 버튼을 누르면 메시지 창이 사라지게 만들기.
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // we don't have to select the message element again.
    // we already have it in memory. > we already have it stored in a variable.
    // ❗️ This remove method is very recent(= newer way.)
    // Before this method existed, all we could do was to 🌟remove child elements.🌟
    // So back then 💥we had to select the "parent element" first💥 and
    // then 💥remove the "child from there".💥
    message.parentElement.removeChild(message);
  });

// Make sure that you review the insert adjacent HTML method as well!
// that we used before in the Bankist application.
*/
