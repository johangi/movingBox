const box = document.getElementById('box');
const box2 = document.getElementById('box2');
const pointsDisplay = document.getElementById('points');

let boxLeft = (window.innerWidth - box.offsetWidth) / 2;
let boxTop = (window.innerHeight - box.offsetHeight) / 2;

box.style.left = boxLeft + 'px';
box.style.top = boxTop + 'px';

let points = 0;
pointsDisplay.textContent = `Points: ${points}`;

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) { // left arrow
    boxLeft -= 10;
  } else if (event.keyCode === 38) { // up arrow
    boxTop -= 10;
  } else if (event.keyCode === 39) { // right arrow
    boxLeft += 10;
  } else if (event.keyCode === 40) { // down arrow
    boxTop += 10;
  }

  // Get the dimensions of the viewport
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // Check if the box is going outside the viewport
  if (boxLeft < 0) {
    boxLeft = 0;
  } else if (boxLeft > viewportWidth - box.offsetWidth) {
    boxLeft = viewportWidth - box.offsetWidth;
  }
  if (boxTop < 0) {
    boxTop = 0;
  } else if (boxTop > viewportHeight - box.offsetHeight) {
    boxTop = viewportHeight - box.offsetHeight;
  }

  // Set the position of the box
  box.style.left = boxLeft + 'px';
  box.style.top = boxTop + 'px';
});

let box2Left = 0;
let box2Top = 0;

let box2DirectionX = 1;
let box2DirectionY = 1;
let box2Speed = 5;
let overlapTime = null; // initialize overlapTime to null

let startTime = new Date().getTime();

function moveBox2() {
  if (!startTime) {
    startTime = new Date().getTime(); // initialize startTime the first time the box moves
  }

  let currentTime = new Date().getTime();
  let minutes = Math.floor((currentTime - startTime) / 60000); // calculate the number of minutes that have passed

  if (minutes > 0) {
    let scaleFactor = 1 + (minutes * 0.1); // calculate the scaling factor
    box2.style.transform = `scale(${scaleFactor})`; // apply the scaling factor
  }

  box2Left += box2DirectionX * box2Speed;
  box2Top += box2DirectionY * box2Speed;

  // Get the dimensions of the viewport
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // Check if the box is going outside the viewport
  if (box2Left < 0) {
    box2Left = 0;
    box2DirectionX = 1;
  } else if (box2Left > viewportWidth - box2.offsetWidth) {
    box2Left = viewportWidth - box2.offsetWidth;
    box2DirectionX = -1;
  }
  if (box2Top < 0) {
    box2Top = 0;
    box2DirectionY = 1;
  } else if (box2Top > viewportHeight - box2.offsetHeight) {
    box2Top = viewportHeight - box2.offsetHeight;
    box2DirectionY = -1;
  }

  // Set the position of the box
  box2.style.left = box2Left + 'px';
  box2.style.top = box2Top + 'px';

  checkCollision();

  if (overlapTime !== null) { // check if the boxes are overlapping
    updateScore(); // update the score continuously while the boxes are overlapping
  }

}

function checkCollision() {
  const boxRect = box.getBoundingClientRect();
  const box2Rect = box2.getBoundingClientRect();

  // Check if the boxes are overlapping
  if (boxRect.right > box2Rect.left && boxRect.left < box2Rect.right && boxRect.bottom > box2Rect.top && boxRect.top < box2Rect.bottom) {
    if (overlapTime === null) {
      // Set the value of overlapTime to the current time
      overlapTime = new Date().getTime();
      points = points - 10
      updateScore();
    }
  } else {
    overlapTime = null; // reset overlapTime to null if the boxes are not overlapping
  }
}

function updateScore() {
  let currentTime = new Date().getTime();
  let seconds = Math.floor((currentTime - startTime) / 1000);

  // Add one point for every second that has passed
  points += seconds;

  // Deduct 10 points for every second that the boxes have been overlapping
  if (overlapTime !== null) {
    let overlapSeconds = Math.floor((currentTime - overlapTime) / 1000);
    points -= overlapSeconds * 10;
  }

  // Update the start time
  startTime = currentTime;

  pointsDisplay.innerHTML = 'Score: ' + points;
}

setInterval(moveBox2, 10);
setInterval(updateScore, 1000)

window.onload = function () {
  setInterval(function () {
    let box2 = document.getElementById('box2');
    let currentSize = box2.clientWidth;
    let newSize = currentSize * 1.1;
    box2.style.width = newSize + 'px';
    box2.style.height = newSize + 'px';
  }, 60000);
};