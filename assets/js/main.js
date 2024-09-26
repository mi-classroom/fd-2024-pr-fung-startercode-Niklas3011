import { slideshow } from "./modules/slideshow.js";
import { fetchAndDisplay } from "./modules/content.js";

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", function () {
  hljs.highlightAll();
  slideshow();
  fetchAndDisplay();
});
