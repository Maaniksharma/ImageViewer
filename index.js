const imageUrlInput = document.getElementById("image-url-input");
const addBtn = document.getElementById("image-add-button");
const imagePlaceholder = document.getElementById("image-placeholder");

const IMAGES = JSON.parse(localStorage.getItem("Images")) || [];
let currentIndex = -1;

if (IMAGES.length > 0) {
  moveIndexRight();
  updateImage();
}

function updateImage() {
  imagePlaceholder.setAttribute("src", IMAGES[currentIndex]);
}

function saveImages() {
  localStorage.setItem("Images", JSON.stringify(IMAGES));
}

function moveIndexRight() {
  currentIndex++;
  if (currentIndex === IMAGES.length) {
    currentIndex = 0;
  }
}

function moveIndexLeft() {
  currentIndex--;
  if (currentIndex === -1) {
    currentIndex = IMAGES.length - 1;
  }
}

function goToNextImage() {
  moveIndexRight();
  updateImage();
}

function goToPrevImage() {
  moveIndexLeft();
  updateImage();
}

function clearImage() {
  IMAGES.splice(currentIndex, 1);
  moveIndexLeft();
  updateImage();
  saveImages();
}

addBtn.addEventListener("click", () => {
  const imageUrl = imageUrlInput.value;
  imagePlaceholder.setAttribute("src", imageUrl);
  IMAGES.push(imageUrl);
  currentIndex++;
  saveImages();
});

document.addEventListener("keypress", (event) => {
  const keyPressed = event.key;
  if (keyPressed === "n") {
    goToNextImage();
  }
  if (keyPressed === "p") {
    goToPrevImage();
  }
  if (keyPressed === "c") {
    clearImage();
  }
});
