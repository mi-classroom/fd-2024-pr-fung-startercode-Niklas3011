import { slideshow } from "./modules/slideshow.js";
import { fetchAndDisplayWorks } from "./modules/content.js";

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", function () {
  hljs.highlightAll();
  slideshow();
  fetchAndDisplayWorks();
});
