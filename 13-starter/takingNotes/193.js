// 193. DOM traversing
/*
'use strict';

// = basically walking through the DOM.
// which means that we can select an element based on another element.
// This is important cause sometimes we need to select elements
// relative to a certain other element.
// (ex. direct child or direct parent element)
// And sometimes we don't even know the structure of the Dom at runtime.
const h1 = document.querySelector('h1');

// 💡 Going downwards: child
// querySelector also works on elements, not only on the document.
// This will select all the elements with the 'highlight' class
// that are children of the h1 element.
// And 💫that would work no matter how deep these child elements
// would be inside of the h1 element.💫
console.log(h1.querySelectorAll('.highlight'));
// Sometimes all we need are actually direct children.
// Nodes can be anything (text/comments/elements...)
// 📍 But many times we simply interested in the elements themselves.
// So if we wanted to text we could use .textContent or .innerHTML.
console.log(h1.childNodes); // so this is not that used..
// 📍 This gives us an HTMLCollection which is a live collection.
// So we only get the 3 elements that are actually inside of the h1.
// ⚠️ But this one works only for direct children.
console.log(h1.children);
// We can actually set the properties or use them to sett something like the style.
// Only the first child gets this color set to white.
// which is the first(last) element of all the children.
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// 💡 Going upwards: parents
console.log(h1.parentNode); // direct parent (straightforward)
console.log(h1.parentElement); // which is usually the one that
// we are interested in.
// 👉 In this case, it's simply the same.
// because this element(h1) is also a node in this case.❌

// ❗️ Most of the time we actually need a parent element which is not a direct parent.
// 즉, 돔 트리에서 얼마나 멀리 떨어져 있는지는 상관없이, parent element를 찾을 필요가 있다.
// >> for that, We have the closest method!
// page상에 class 네임으로 header를 가지고 있는 다양한 elements들이 존재하지만,
// 우리는 그중에서 h1에 있는 parent element만을 가지고 오고 싶은 것!

// 📍 It selected the closest header to our h1 element, so the closest
// parents element that has this class('header') and then it's simply
// applied all style to that element.
// >> we're gonna use it all the time very important🌟🌟🌟
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// 📍 If this selector(ex. '.header') actually matches the element,
// on which we're calling closest, then that's actually the element
// that's gonna be returned.
// If we are calling h1 on the h1 element, that's gonna be exactly
// the element itself.
h1.closest('h1').style.background = 'var(--gradient-primary)';

// We can use custom properties also in CSS.
// we can think of closest as being the opposite of querySelector.
// Both receive a query string as an input but 💥querySelector finds children,💥
// no matter how deep in the Dom tree while the 💥closest method finds parents.💥
// Also no matter how far up in the Dom tree.

// 💡 Going sideways: siblings
// ❌
console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // <h4></h4>

// 📍 Just like before, we also have the same methods or
// actually the same properties for nodes.
// ❗️ But it's not really important
// because most of the time we're gonna be working with elements.
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// 📍 If we really need all the siblings, not just the previous and the next one,
// then we can use the trick of 💫moving up to the parent element and
// then read all the children from there.💫
console.log(h1.parentElement.children);

// it's not an array but it's still an 💥iterable💥 that we can
// spread into an array. it will then create an array from above one.
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
// when the element is not the h1 itself, change the style.
// all the other 3 siblings are now 50% smaller.
*/
