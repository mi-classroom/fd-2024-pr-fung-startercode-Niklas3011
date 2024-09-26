export function fetchImages() {
  const url =
    "http://0.0.0.0:4000/works/n-pola/04-results/images/metadata.json";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((imagesData) => {
      renderImages(imagesData);
    })
    .catch((error) => {
      console.error("Error fetching images metadata:", error);
    });
}

function renderImages(images) {
  const imagesSection = document.querySelector("[data-js-images]");

  if (!imagesSection) {
    console.error("No section found for rendering images.");
    return;
  }

  images.forEach((image) => {
    // Create the image element
    const imgElement = document.createElement("img");
    const imageUrl = "/works/n-pola/04-results/" + image.src;
    console.log(imageUrl);
    imgElement.src = imageUrl;
    imgElement.alt = image.metadata.Title;
    imgElement.classList.add("images");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-containers");

    imgContainer.appendChild(imgElement);

    imagesSection.appendChild(imgContainer);
  });
}
