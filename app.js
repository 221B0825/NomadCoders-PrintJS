const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);
const canvas = document.querySelector('canvas');

//context
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

let isPainting = false;

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

//copy a single line: Shift + Alt + Direction Key
//delete line: Ctrl + Shift + K
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

//in this function, color = Each color option.
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));
