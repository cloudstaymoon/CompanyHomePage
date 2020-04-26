
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  // 获取
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  if (window.pageYOffset > 1000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

const glide = new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  autoplay: 3500,
});
const captionsEL = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEL[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "spring(1, 80, 10, 0)",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

glide.mount();

// 成功案例 js
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    isotope.arrange({ filter: filterOption });
  }
});

// 通用滑动出现动画配置项
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
};

// interval设置等待时间
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });

ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });

const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 1500,
      round: 1,
      easinge: "easeInExpo",
    });
    dataSectionEl.style.backgroundPosition =
      "center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)";
  },
});

window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect.top;
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = "center calc(50% - ${bottom/5}px)";
  }
});

const scroll = new SmoothScroll(
  'nav a[href*="#"] , .scroll-to-top a[href*="#"]',
  {
    header: "header",
    offset: 50,
  }
);

document.addEventListener("scrollStart", () => {
  if(headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach((exploreBtnEl) => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

// 折叠按钮事件
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
})