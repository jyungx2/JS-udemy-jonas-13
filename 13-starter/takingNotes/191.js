// 191. Event Propagation in Practice
/*
'use strict';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // ❗️ In an event handler, this keyword points always to the element
  // on which that event handler is attached.
  console.log('LINK', e.target, e.currentTarget);
  // 💡 1) e.target
  // : e.target is essentially where the event originated.(first click happened)
  // this is not the element on which the handler is actually attached.
  // >> features버튼을 클릭하면, 컨솔 상에서 출력되는 target값은 항상 똑같다.
  // All three handlers' target element will always be the same. (="nav__link")
  // that's of course the element wehre the click first happened.
  // e > all of them handle the exact same event > becasue of event bubbling.
  // event originates in '.nav__link', but then it bubbles up to its parent
  // element(='nav__links') and from there to its next parent element(=
  // ='.nav') and from there, it will travel even further up in the DOM tree.
  // So we can then handle that event in all of the parent elements.

  // 💡 2) e.currentTarget
  // : the element on which the event handler is attached.
  // And so if we do this now, then you will see that the currentTarget
  // is not the same. Well, in the link it is of course, because
  // that's where the event happened and it's also where the handler
  // is attached to.
  // 📍 this keyword is also the one pointing to the element
  // on which the EventListener is attached to.
  // => this keyword and event.currentTarget are gonna
  // be exactly the same in any event handler.
  console.log(e.currentTarget === this); // true

  // 💡 3) Stop propagation (not a really good idea.)
  // e.stopPropagation();
  // >> parent element인 .nav__links, .nav 버튼에는 적용이 안된다.(색깔 변화 X)
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true // 💡 4) Capturing (is actually rarely used these days.)
  // If we really want to capture the event during the capturing the phase,
  // we can define a third paramter to true or false
  //  in the addEventlistener function (= used capture parameter)
  // So in this case where this used capture parameter is set to true,
  // eventhandler will no longer listen to bubbling events
  // but instead, to capturing events.
  // 컨솔 상에 출력되는 first element가 LINK -> NAV로 바뀜!
  // first element through which the event passes is the navigation.
  // reason : this element is now actually listening for the event
  // as it travels down(DOM => target)⬆️ from the DOM while these
  // other ones are listening for the event, as it travels back up (target => DOM)⬇️.
);
*/
