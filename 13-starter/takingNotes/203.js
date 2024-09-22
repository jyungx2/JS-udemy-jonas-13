// 203. Efficient Script Loading: defer and async

// When we include a script without any attribute in the head,
// what will the page loading process look like over time?

// 👉 Parsing HTML - Waiting...(Fetch script+Execute) - Finish parsing HTML (DOMContentLoaded) 👈
// As the user loads the page and receives the HTML,
// the HTML code will start to be parsed by the browser and
// parsing the HTML is basically building the DOM tree from the
// HTML elements. Then at a certain point, it will find or a script
// tag, start to fetch the script, and then execute it.

// Now, during all this time, the HTML parsing will actually stop.
// So it will be waiting for the script to get fetched and executed.
// Only after that, the rest of the HTML can be parsed.
// And at the end of that parsing, the 'DOM content loaded' event
// will finally get fired, as we learned in the last video.
// Now, this is not ideal at all, right?

// 💥 script를 절대 head에 포함하지 말아라!💥
// 왜냐하면 우리는 브라우저가 아무 것도 안 하고 앉아있기를 기다리는 게 아니다.
// >> 이것은 페이지의 performance에 있어서 안 좋은 영향을 끼침.
// 또한, DOM이 준비되기 전에 실행되는 것을 원치 않기 때문에 안 된다.

// >> 이러한 이유가 우리가 항상 body 끝에 script를 첨부하는 이유이다.
// so that all the HTML is already parsed, when it finally reaches the script tag.
// (즉, HTML이 모두 parse되고 나서, 그 다음에 script를 가져오고, 실행하는 것)
// 👉 Parsing HTML - Fetch script - Execute (DOMContentLoaded) 👈
// (The HTML is parsed, then the script tag is found at the
// end of the document, then the script is fetched.
// And then finally, the script gets executed.)

// 🤔 하지만 이것도 완벽한 방법은 아닌 게, HTML이 여전히 parse되고 있을 때,
// 스크립트가 먼저 다운로드 될 수도 있기 때문이다. (❌왜? parsing후에 fetch하는 건데?..)
// (Well, now you know, however, this is still not perfect,
// because the script could have been downloaded before,
// while the HTML was still being parsed.)

// This is what the loading process looks like
// when we use 'async' script loading in the head of the document.
// 👉 Parsing HTML(+Fetch script) - Waiting...(+Execute) - Finish parsing HTML (DOMContentLoaded) 👈
// 💡 차이점은 'HTML이 parse되는 동시에 같이' 스크립트를 가져온다는 점이다.
// 하지만, HTML parsing은 여전히 스크립트가 실행될 때 멈춘다!
// (So the script is actually downloaded asynchronously.
// But then it's executed right away in asynchronous way.
// And so the HTML code has to wait for being parsed.
// But anyway, as we can see from the length
// of the diagrams, this still makes page loading time shorter.)

// Then, what about the defer attribute?
// 👉 Parsing HTML (+Fetch script) - Execute (DOMContentLoaded)👈
// 💡 async과의 차이점은 HTML이 parse되는 동시에 스크립트를 가져오는 건
// 똑같지만, execute되는 시점이 HTML의 parse가 끝나는 시점으로 미뤄진다는 것이다.
// 즉, HTML이 parse되고 나서 동시에 스크립트가 execute된다!
// 따라서 loading time은 async attribute와 similiar to 하지만,
// 중요한 차이점은 defer attribute is never interrupted.
// 왜냐하면 스크립트는 오직 마지막에 실행되기 때문이다. >> This is what we want.

// 이 두가지(async/defer) attribute를 왜 body에서 보여주지 않았느냐,
// Because they simply don't make sense in the body!
// body에서는 fetching/executing script는 항상 HTML parsing 이후에
// 일어나기 때문에 async and defer have no pracitcal effect at all. (they make no difference.)

// * asynchronously: 동시에 존재(발생)하지 않는, 비동기로
// 📍 async attribute의 한가지 중요한 점은, 다른 것과 다르게 DOMContentLoaded
// event가 스크립트가 다운로드되고 실행될 때까지 ❗️기다려주지 않는다는 것이다.❗️
// 이름과 같이, 동시에 가지 않고, 따로따로 제 갈길 간다고 생각하자!
// 즉, Parse HTML 과 동시에 script를 가져오고, 실행되지만, 실행되기 전에
// DOMContentLoaded event가 끝날 수 있다는 건데, 반대로 defer 같은 경우엔
// DOMContentLoaded event가 script가 전부 실행되고 나서 기다렸다가 같이 끝난다.

// 보통 DOMCOntentLoaded event는 모든 스크립트가 실행되기까지 기다리지만,
// async로 로드된 스크립트는 예외라는 것. 따라서 with async, DOMContentLoaded는
// is fired off as soon as the HTML finishes parsing.
// On the other hand, defer

// ⛳️ Using defer in the HTML head is overall the best solution.
// >> From now on, we will always load our scripts using defer attribute in the head!
// <script defer src="script.js"></script>

// 🌟 So you should use it for your own scripts.
// And for scripts where the order of execution is important.
// For example, if your script relies on some third party library
// that you need to include, you will include that library before
// your own script, so that your script can then use the library's code.
// And in this case, 🔥you have to use defer🔥 and not async.
// because defer will guarantee the correct order of execution.

// 🌟 하지만 순서가 별로 중요하지 않은, third party script/Google analytics같은
// analytics software/ad script같은 스크립트를 사용할 때는
// defer가 아닌, async를 써도 상관없다! (good use case for this kind of scripts.)
// So for any code that your own code will not need to interact
// with async is just fine.
