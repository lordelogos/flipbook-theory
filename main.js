// create canvas element
const canvas = document.createElement("canvas");
canvas.height = 810;
canvas.width = 1440;
const context = canvas.getContext("2d");

// application logic
const frameCount = 64;
const currentFrame = (index) => {
  // path to assets
  // return `/assets/${index.toString().padStart(4, "0")}.png`;
  return `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${index
    .toString()
    .padStart(4, "0")}.png`;
};

const preloadImages = () => {
  // loop through all the frames and load the images
  for (let i = 1; i < frameCount + 1; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// change the image drawn on the canvas
const updateImage = (index) => {
  img.src = currentFrame(index);
  // clean up the prev image for transparent pngs
  // also increase performance
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// draw the first image on page load
const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
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

// load images
preloadImages();

// logic ends
document.body.appendChild(canvas);
