var href = false;

const toc = document.getElementById("table-of-contents");
const nav = document.createElement("nav");
nav.id = "nav";
nav.append(toc);
document.getElementsByTagName("body")[0].prepend(nav);

const slideout = new Slideout({
  panel: document.getElementById("content"),
  menu: document.getElementById("nav"),
  padding: 300,
  tolerance: 70,
});

slideout.on("close", function () {
  const content = document.getElementById("content");
  content.style.maxWidth = "860px";
  if (window.innerWidth > 768) {
    const offset = window.innerWidth - 300;
    content.style.maxWidth = offset >= 860 ? "860px" : offset + "px";
  } else {
    content.style.maxWidth = "860px";
  }
});

slideout.on("open", function () {
  console.log(href);
  if (href) href.scrollIntoView({ block: center });
  if (window.innerWidth > 768) {
    const content = document.getElementById("content");
    const offset = window.innerWidth - 300;
    content.style.maxWidth = offset >= 860 ? "860px" : offset + "px";
  }
});

const manageSlideoutBasedOnScreenWidth = () => {
  if (window.innerWidth > 768) {
    const content = document.getElementById("content");
    const offset = window.innerWidth - 300;
    content.style.maxWidth = offset >= 860 ? "860px" : offset + "px";
    slideout.open();
  } else {
    content.style.maxWidth = "860px";
    slideout.close();
  }
};

window.addEventListener("resize", manageSlideoutBasedOnScreenWidth);
window.addEventListener("load", manageSlideoutBasedOnScreenWidth);

textToc = document.getElementById("text-table-of-contents");
Array.from(
  textToc.getElementsByTagName("ul")[0].getElementsByTagName("li")
).forEach((el) => {
  el.getElementsByTagName("a")[0].addEventListener("click", (e) => {
    e.preventDefault();
    const oldDuration = slideout._duration;
    slideout._duration = 1;
    manageSlideoutBasedOnScreenWidth();
    slideout._duration = oldDuration;
    const clickedHrefId = el.firstChild.getAttribute("href");
    href = $(clickedHrefId)[0];
    if (window.innerWidth > 768) {
      href.scrollIntoView();
      href = false;
      slideout.open();
    }
  });
});

window.addEventListener("transitionend", () => {
  if (href) {
    href.scrollIntoView({ block: "center" });
    href = false;
  }
});

document.getElementById('table-of-contents').style.display = "block"
// toc.style.display = "block"
