// 190. Event Propagation: Bubbling and Capturing
// Events(property) - 1. capturing phase  2. bubbling phase
// 🤔 What happens with an event when someone clicks on that link??
// 클릭했을 때, event는 이벤트가 실행되는 target element에서 생성되지 않고,
// 강의 상에서는 click on the anchor element = target element
// DOM tree의 가장 꼭대기인 root of the document에서 생겨난다.
// 👉 그리고 여기서 이벤트가 document route에서 target element로, 점점
// 하위 단계로 내려가는 capturing phase가 실행된다.
// (event travels down the tree..passes through all its 💫sibling elements💫)
// 이때, event는 target element의 every single parent element들을
// pass through하게 된다.
// 그리고, 이렇게 하위단계로 가다가 가장 마지막인 target element에 도착하면,
// 👉 target phase begins where events can be handled right at the target.
// >> 쉽게 말해 그냥 해당 스트링이 쓰여진 alert window를 생성
// target에 도착한 후에는 event travels all the way up to the document route again.
// 👉 bubbling phase: events bubble up from the target to the document route.
// just like in the capturing phase, the event passes through all its 💫parent elements.💫
// 🚩 만약, 우리가 target element외에, 이것의 parent element 중 하나인 section element에도
// 똑같은 eventlistener를 attach한다면, section element를 클릭할 때도 마찬가지로
// 완전히 똑같은 alert window를 얻을 것이다.
// So we would've handled the exact same event twice.
// once at it's target, and once at one of its parent elements.
// ⚠️ Not all types of events do have a capturing and bubbling phase.
// Some of them are created right on the target element and so we can
// handle them there. But really, most of the events do capture and bubble.
