import { fetchImages } from "./images.js";

export function fetchSingleData() {
  console.log("Hello2");
  // URL to the works.json file
  const worksUrl = "http://0.0.0.0:4000/works.json";

  // Get the current page URL
  const currentPageUrl = window.location.pathname;

  // Get the section element where the work details will be rendered
  const worksSection = document.querySelector("[data-js-works]");

  // Function to fetch the data and find the matching work entry
  function fetchAndRenderWork() {
    fetch(worksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Find the work entry that matches the current URL
        const matchingWork = data.find((work) => work.url === currentPageUrl);

        if (matchingWork) {
          renderWorkDetails(matchingWork);
        } else {
          worksSection.innerHTML = "<p>Work not found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        worksSection.innerHTML = "<p>Error loading work details.</p>";
      });
  }

  function renderWorkDetails(work) {
    // Create HTML structure for the work details
    const workDetails = `
    <img src="${work.image}" class="single-work-image" alt="${
      work.title
    }" style="max-width: 100%; height: auto;" />
    <h1 class="single-work-title">${work.title}</h1>
    <h3 class="single-work-small-title">${work.type} von ${work.author}</h3>
    <p><strong>Keywords:</strong> ${work.keywords}</p>
    <p><strong>Datum:</strong> ${new Date(work.date).toLocaleDateString(
      "de-DE",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}</p>
    <p><strong>PDF:</strong> <a class="single-work-link">Download</a></p>
    <p><strong>Website zur Arbeit:</strong> <a class="single-work-link">https://www.${
      work.url
    }</a></p>
    <p><strong>Repository zur Arbeit:</strong> <a class="single-work-link">https://github.com${
      work.url
    }</a></p>
    <div>${work.abstract}</div>

  `;

    // Insert the details into the works section
    worksSection.innerHTML = workDetails;
  }

  // Fetch and render the work entry
  fetchAndRenderWork();
  fetchImages();
}

document.addEventListener("DOMContentLoaded", function () {
  hljs.highlightAll();
  fetchSingleData();
});
