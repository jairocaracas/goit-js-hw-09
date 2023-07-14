const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const frame = document.querySelector('.color-frame');
const rText = document.querySelector('[data-r]');
const gText = document.querySelector('[data-g]');
const bText = document.querySelector('[data-b]');

let interval;
start.disabled = false;
stop.disabled = true;

start.addEventListener('click', () => {
  newBackgroundColor();
  interval = setInterval(newBackgroundColor, 1000);
  start.disabled = true;
  stop.disabled = false;
});

function newBackgroundColor() {
  const randomColor = getRandomHexColor();
  frame.style.backgroundColor = randomColor;
  document.body.style.backgroundColor = randomColor;

  const { r, g, b } = hexToRGB(randomColor);
  rText.innerText = r;
  gText.innerText = g;
  bText.innerText = b;
}

function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stop.addEventListener('click', () => {
  clearInterval(interval);
  start.disabled = false;
  stop.disabled = true;
});
