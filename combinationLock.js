const canvasWidth = 500;
const canvasHeight = 500;
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;
const lockRadius = 200;
const tickLength = 10;
const tickDistance = 5;
const tickFont = "20px Arial";
const numberFont = "30px Arial";
const nudgeAmount = 1;

let currentPosition = 0;

const imageCanvas = document.createElement("canvas");
imageCanvas.width = 560;
imageCanvas.height = 560;

const imageContext = imageCanvas.getContext("2d");
const image = new Image();
image.src = "lockbg.png";
image.onload = function () {
  imageContext.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
};

function drawLock() {
  const canvas = document.getElementById("lockCanvas");
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  drawDial(context);

  context.save();
  context.translate(centerX, centerY);
  context.rotate((-currentPosition * Math.PI) / 20);
  context.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
  context.restore();

  drawTicks(context, currentPosition);
  drawNumbers(context, currentPosition);
}

function drawTicks(context, position) {
  context.beginPath();
  for (let i = 0; i < 40; i++) {
    const angle = ((i - position) * Math.PI) / 20;
    const tickLength = i % 5 === 0 ? 25 : 10;
    context.moveTo(centerX + (lockRadius - tickLength) * Math.cos(angle), centerY + (lockRadius - tickLength) * Math.sin(angle));
    context.lineTo(centerX + lockRadius * Math.cos(angle), centerY + lockRadius * Math.sin(angle));
  }

  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.stroke();
}

function drawNumbers(context, position) {
  context.font = numberFont;
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  for (let i = 0; i < 8; i++) {
    const number = (i * 5 + 40) % 40;
    const angle = ((-90 + i * 5 - position + 40) * Math.PI) / 20;
    const x = centerX + (lockRadius - 50) * Math.cos(angle);
    const y = centerY + (lockRadius - 50) * Math.sin(angle);
    context.fillText(number.toString(), x, y);
  }
}

function drawDial(context, position) {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawTicks(context);
  drawNumbers(context);

  context.save();
  context.translate(centerX, centerY);
  context.rotate((position * Math.PI) / 20);

  context.beginPath();
  context.moveTo(0, -lockRadius + 10);
  context.lineTo(0, -lockRadius - 30);
  context.strokeStyle = "red";
  context.lineWidth = 5;
  context.stroke();

  context.restore();
}

function nudgeLeft() {
  currentPosition += nudgeAmount;
  currentPosition %= 40;
  drawLock();
}

function nudgeRight() {
  currentPosition -= nudgeAmount;
  currentPosition = (currentPosition + 40) % 40;
  drawLock();
}

drawLock();
