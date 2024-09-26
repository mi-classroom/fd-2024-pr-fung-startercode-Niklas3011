function fetchAndDisplayWorks() {
  const worksUrl = "http://0.0.0.0:4000/works.json";

  const worksList = document.querySelector("[data-js-finished-works]");

  fetch(worksUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((work) => {
        const listItem = document.createElement("li");
        listItem.classList.add("work-item");

        const img = document.createElement("img");
        img.src = work.image ? work.image : "path/to/default-image.jpg";
        img.alt = `Image for ${work.title}`;
        img.classList.add("work-image");

        const workInfo = document.createElement("div");
        workInfo.classList.add("work-info");

        const titleLink = document.createElement("a");
        titleLink.href = work.url;
        titleLink.textContent = work.title;
        titleLink.classList.add("work-title-link");

        const title = document.createElement("h3");
        title.appendChild(titleLink);

        const authorInfo = document.createElement("p");
        authorInfo.classList.add("work-author");
        authorInfo.textContent = `${work.author}, ${work.type}, ${new Date(
          work.date
        ).toLocaleDateString("de-DE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;

        workInfo.appendChild(title);
        workInfo.appendChild(authorInfo);
        listItem.appendChild(img);
        listItem.appendChild(workInfo);
        worksList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

export { fetchAndDisplayWorks };
