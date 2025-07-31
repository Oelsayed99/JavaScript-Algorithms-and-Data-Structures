const darkColorsArr = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#800020",
  "#1C1C1C",
  "#1A1A40",
  "#191970",
  "#2F2F4F",
];

const body = document.body;
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");
const btn = document.querySelector("#btn");
const paletteContainer = document.querySelector("#palette");

function getRandomIndex() {
  return Math.floor(Math.random() * darkColorsArr.length);
}

function isColorDark(hex) {
  // Convert hex to RGB
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 128;
}

function changeBackgroundColor() {
  const color = darkColorsArr[getRandomIndex()];
  body.style.backgroundColor = color;
  bgHexCodeSpanElement.textContent = color;
  bgHexCodeSpanElement.style.color = isColorDark(color) ? "#fff" : "#000";
}

function renderPalette() {
  darkColorsArr.forEach(color => {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.title = color;
    box.onclick = () => {
      body.style.backgroundColor = color;
      bgHexCodeSpanElement.textContent = color;
      bgHexCodeSpanElement.style.color = isColorDark(color) ? "#fff" : "#000";
    };
    paletteContainer.appendChild(box);
  });
}

btn.onclick = changeBackgroundColor;
renderPalette();
