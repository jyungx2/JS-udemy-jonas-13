// 202. Lifecycle DOM events

'use strict';

// lifecycle = right from the moment that the page is first accessed,
// until the user leaves it.

// 1) 'DOM ContentLoaded' event
// : this event is fired by the 💫document as soon as the HTML is completely
// parsed, which means that the HTML has been downloaded and been converted
// to the DOM Tree.
// Also, all scripts must be downloaded and executed before the 'DOM
// contentloaded' event can happen.

// ❗️ Just HTML and JS need to be loaded.
// => doesn't wait for images and other external resources to load.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// 📍 When we have to script tag at the end of the HTML,
// then we do not need to listen for the 'DOM contentloaded' event.
// >> There are also other ways of loading the JS file with the script tag,
// we're gonna talk about that in the next lecture.

// 2) ready
// This is equivalent to the DOM ContentLoaded in vanilla JS.
// If you're coming to vanilla JS from jQuery (But no such thing in regular JS)
// You're probably used to wrap all your code into 'document ready' function.
document.ready;

// 3) 'load' event
// this event is fired by the 💫window as soon as not only the HTML is parsed,
// but also all the images and external resources like CSS files are also loaded.
// => 1)과 다른점!
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// 4) 'beforeunload' event
// this event is also fired by the💫window, and is created immediately
// befroe a user is about to leave a page.

// After clicking this close button in the browser tab,
// we can basically use this event to ask users if they are 100% sure
// that they want to leave the page.

window.addEventListener('beforeunload', function (e) {
  e.preventDefault(); // In chrome, it's not necessary. some browsers require this.
  console.log(e);
  e.returnValue = ''; // In order to display a leaving confirmation,
  // we need to set the return value on the event to an empty string.
  // this probably looks a bit weird, but it's for historical reasons.
  // many people started to abuse this, so now we can only see it as a generic message.
  // that's why we have here this empty string.
  // It should (only) be displayed when necessary!!
  // For example, when the user is leaving in the middle of filling out
  // the form, or like writing a blog post or something like that.

  // There will (always) be people who disagree with you..
  // I think I'll always have to keep in mind if I don't keep my promise myself at least once, it will come back to me negatively anyway.
});

// Next section: DOMContentLoaded event & different ways of loading scripts in HTML.
