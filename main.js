// create canvas element
const canvas = document.createElement("canvas");
canvas.height = 810;
canvas.width = 1440;
const context = canvas.getContext("2d");

// application logic
const frameCount = 64;
const currentFrame = (index) => {
  return `/assets/${index.toString().padStart(4, "0")}.png`;
};

const preloadImages = () => {
  for (let i = 1; i < frameCount + 1; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// load images
preloadImages();

const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// bound images to dom scroll event
window.addEventListener("scroll", () => {
  const html = document.documentElement;
  const body = document.body;
  const scrollTop = html.scrollTop;
  const maxScrollTop = body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

// logic ends
document.body.appendChild(canvas);
