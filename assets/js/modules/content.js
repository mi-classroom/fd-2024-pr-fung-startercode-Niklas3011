function fetchAndDisplay() {
  const worksUrl = "http://0.0.0.0:4000/works.json";
  const worksList = document.querySelector("[data-js-finished-works]");
  const button = document.createElement("button");

  button.textContent = "Weiter Arbeiten anzeigen";
  button.classList.add("load-more-button");
  button.style.display = "none";
  worksList.after(button);

  let allWorks = [];

  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.style.display = "none";
  document.body.appendChild(modal);

  const modalImg = document.createElement("img");
  modalImg.classList.add("modal-image");
  modal.appendChild(modalImg);

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  fetch(worksUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      allWorks = data;
      displayWorks(allWorks.slice(0, 5));

      if (allWorks.length > 5) {
        button.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function displayWorks(works) {
    works.forEach((work) => {
      const listItem = document.createElement("li");
      listItem.classList.add("work-item");

      const img = document.createElement("img");
      img.src = work.image ? work.image : "path/to/default-image.jpg";
      img.alt = `Image for ${work.title}`;
      img.classList.add("work-image");

      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.style.display = "block";
      });

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
  }

  button.addEventListener("click", () => {
    displayWorks(allWorks.slice(5));
    button.style.display = "none";
  });
}

export { fetchAndDisplay };
