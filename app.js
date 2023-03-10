const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');
const file = document.getElementById('file');

const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);
const canvas = document.querySelector('canvas');

//context
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

// move a single line: Alt + Direction Key
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
//console.dir() : check the clicked object
function onColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    modeBtn.innerText = 'Draw';
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'draw';
}

function onFileChange(event) {}

//copy a single line: Shift + Alt + Direction Key
//delete line: Ctrl + Shift + K
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

//in this function, color = Each color option.
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));
modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
file.addEventListener('change', onFileChange);
