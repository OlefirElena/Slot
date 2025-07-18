document.addEventListener("DOMContentLoaded", function() {
  const hreflangLink = document.querySelector('link[rel="alternate"][hreflang="de"]');
  if (hreflangLink) {
    hreflangLink.setAttribute("href", window.location.href);
    console.log("hreflang gesetzt:", window.location.href);
  }
});
document.querySelectorAll(".rating").forEach((rating) => {
  const stars = rating.querySelector(".rating__stars");
  const value = rating.querySelector(".rating__value");
  const rate = stars.dataset.rate;
  if (rate && value) {
    value.textContent = parseFloat(rate).toFixed(1);
  }
});
document.querySelectorAll(".rating__stars").forEach((el) => {
  const rate = parseFloat(el.dataset.rate);
  el.style.setProperty("--rate", rate);
});
function initWatchBlock() {
  const watchEl = document.querySelector("[data-watch]");
  if (!watchEl) return;
  const attr = watchEl.dataset.watch;
  let breakpoint = 0;
  let direction = "min";
  if (attr) {
    const [value, type] = attr.split(",").map((item) => item.trim());
    breakpoint = parseFloat(value) || 0;
    direction = type === "max" ? "max" : "min";
  }
  const viewportWidth = window.innerWidth;
  const condition = direction === "min" && viewportWidth >= breakpoint || direction === "max" && viewportWidth <= breakpoint;
  if (!condition) {
    watchEl.classList.remove("--watch");
    return;
  }
  if (!watchEl.dataset._watchInitialized) {
    const marker = document.createElement("div");
    marker.style.position = "absolute";
    marker.style.top = "0";
    marker.style.left = "0";
    marker.style.width = "1px";
    marker.style.height = "1px";
    marker.style.pointerEvents = "none";
    const parent = watchEl.parentElement;
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }
    parent.insertBefore(marker, watchEl);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          watchEl.classList.add("--watch");
        } else {
          watchEl.classList.remove("--watch");
        }
      },
      {
        root: null,
        threshold: 0
      }
    );
    observer.observe(marker);
    watchEl.dataset._watchInitialized = "true";
    повторно;
  }
}
function debounce(func, wait = 200) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
window.addEventListener("DOMContentLoaded", initWatchBlock);
window.addEventListener("resize", debounce(initWatchBlock));
class DynamicAdaptRange {
  constructor() {
    this.daClassname = "--dynamic";
    this.init();
  }
  init() {
    this.objects = [];
    const nodes = [...document.querySelectorAll("[data-fls-dynamic]")].filter((node) => node.dataset.flsDynamic.includes("-"));
    nodes.forEach((node) => {
      var _a, _b, _c;
      const data = node.dataset.flsDynamic.trim();
      const dataArray = data.split(",");
      const object = {};
      object.element = node;
      object.parent = node.parentNode;
      object.destinationParent = dataArray[3] ? node.closest(dataArray[3].trim()) || document : document;
      const objectSelector = (_a = dataArray[0]) == null ? void 0 : _a.trim();
      const range = (_b = dataArray[1]) == null ? void 0 : _b.trim();
      object.place = ((_c = dataArray[2]) == null ? void 0 : _c.trim()) || "0";
      if (objectSelector && range) {
        const foundDestination = object.destinationParent.querySelector(objectSelector);
        if (foundDestination) {
          object.destination = foundDestination;
        } else {
          console.warn(`[DynamicAdaptRange] Destination not found: ${objectSelector}`);
          return;
        }
        const [minStr, maxStr] = range.split("-");
        object.min = parseFloat(minStr);
        object.max = parseFloat(maxStr);
        object.index = [...object.parent.children].indexOf(object.element);
        this.objects.push(object);
      }
    });
    this.startListening();
  }
  startListening() {
    window.addEventListener("resize", this.checkAll.bind(this));
    window.addEventListener("load", this.checkAll.bind(this));
    this.checkAll();
  }
  checkAll() {
    const width = window.innerWidth;
    this.objects.forEach((object) => {
      const inRange = width >= object.min && width <= object.max;
      if (inRange && !object._moved) {
        object._moved = true;
        this.moveTo(object);
      } else if (!inRange && object._moved) {
        object._moved = false;
        this.moveBack(object);
      }
    });
  }
  moveTo({ element, destination, place }) {
    var _a;
    element.classList.add(this.daClassname);
    const index = place === "last" || place === "first" ? place : parseInt(place, 10);
    if (index === "last" || index >= destination.children.length) {
      destination.append(element);
    } else if (index === "first") {
      destination.prepend(element);
    } else {
      (_a = destination.children[index]) == null ? void 0 : _a.before(element);
    }
  }
  moveBack({ element, parent, index }) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== void 0) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }
}
window.addEventListener("load", () => {
  new DynamicAdaptRange();
});
const updatedDate = new Date(document.lastModified).toLocaleDateString();
document.querySelectorAll(".last-updated span").forEach((el) => {
  el.textContent = updatedDate;
});
document.addEventListener("DOMContentLoaded", function() {
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const headers = table.querySelectorAll("thead th");
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      cells.forEach((cell, index) => {
        const headerText = headers[index] ? headers[index].innerText : `Колонка ${index + 1}`;
        cell.setAttribute("data-label", headerText.trim());
      });
    });
  });
});
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
