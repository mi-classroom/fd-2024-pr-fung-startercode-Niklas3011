import { slideshow } from "./modules/slideshow.js";
import { fetchAndDisplayWorks } from "./modules/content.js";
import { fetchSingleData } from "./modules/work.js";

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", function () {
  hljs.highlightAll();
  slideshow();
  fetchAndDisplayWorks();
  fetchSingleData();
});
