// DOM Elements for code
const box = document.getElementById('box'); // Get player box element
const box2 = document.getElementById('box2'); // Get enemy box element
const pointsDisplay = document.getElementById('points'); // Get points display element

// Select top and left side of player box using window dimensions
let boxLeft = (window.innerWidth - box.offsetWidth) / 2; // Get horizontal center of player box
let boxTop = (window.innerHeight - box.offsetHeight) / 2; // Get vertical center of player box

// Apply default styling (position) to player box
box.style.left = boxLeft + 'px'; // Set horizontal position of player box
box.style.top = boxTop + 'px'; // Set vertical position of player box

// Apply default points display and counter
let points = 0; // Initialize points to zero
pointsDisplay.textContent = `Points: ${points}`; // Set points display text

// Event listener for player box, checks for Arrow keys
document.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) { // left arrow
    boxLeft -= 10; // Move box left
  } else if (event.keyCode === 38) { // up arrow
    boxTop -= 10; // Move box up
  } else if (event.keyCode === 39) { // right arrow
    boxLeft += 10; // Move box right
  } else if (event.keyCode === 40) { // down arrow
    boxTop += 10; // Move box down
  }

  // Get the dimensions of the viewport
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // Check if the box is going outside the viewport
  if (boxLeft < 0) { // If box exceeds left boundary
    boxLeft = 0; // Keep box within left boundary
  } else if (boxLeft > viewportWidth - box.offsetWidth) { // If box exceeds right boundary
    boxLeft = viewportWidth - box.offsetWidth; // Keep box within right boundary
  }
  if (boxTop < 0) { // If box exceeds top boundary
    boxTop = 0; // Keep box within top boundary
  } else if (boxTop > viewportHeight - box.offsetHeight) { // If box exceeds bottom boundary
    boxTop = viewportHeight - box.offsetHeight; // Keep box within bottom boundary
  }

  // Set the position of the box
  box.style.left = boxLeft + 'px'; // Set horizontal position of player box
  box.style.top = boxTop + 'px'; // Set vertical position of player box
});

// Initialize and declare initial postion variables for "enemy" box
let box2Left = 0; // Initialize horizontal position of enemy box
let box2Top = 0; // Initialize vertical position of enemy box

// Intialize and declare direction and speed variables
let box2DirectionX = 1; // Initialize horizontal direction of enemy box
let box2DirectionY = 1; // Initialize vertical direction of enemy box
let box2Speed = 5; // Initialize speed of enemy box
let overlapTime = null; // Initialize overlapTime to null

// Intialize and declare start time variable
let startTime = new Date().getTime(); // Get current time in milliseconds

// Function for the movement of the "enemy" box (box2)
function moveBox2() {
  // Ensure start time exists
  if (!startTime) {
    startTime = new Date().getTime(); // initialize startTime the first time the box moves
  }

  let currentTime = new Date().getTime(); // Get the current time
  let minutes = Math.floor((currentTime - startTime) / 60000); // calculate the number of minutes that have passed

  if (minutes > 0) {
    let scaleFactor = 1 + (minutes * 0.1); // calculate the scaling factor
    box2.style.transform = `scale(${scaleFactor})`; // apply the scaling factor
  }

  // Apply new direction to box2
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
  let currentTime = new Date().getTime(); // get the current time
  let seconds = Math.floor((currentTime - startTime) / 1000); // calculate the number of seconds that have passed

  // Add one point for every second that has passed
  points += seconds;

  // Deduct 10 points for every second that the boxes have been overlapping
  if (overlapTime !== null) {
    let overlapSeconds = Math.floor((currentTime - overlapTime) / 1000); // calculate the number of seconds that the boxes have been overlapping
    points -= overlapSeconds * 10; // deduct points for each second of overlap
  }

  // Update the start time
  startTime = currentTime;

  pointsDisplay.innerHTML = 'Score: ' + points; // update the score display
}

// call moveBox2 every 1 millisecond and updateScore every 1000 milliseconds
setInterval(moveBox2, 1);
setInterval(updateScore, 1000)

// when the window loads, set a timer to increase the size of box2 every 60000 milliseconds
window.onload = function () {
  setInterval(function () {
    let box2 = document.getElementById('box2'); // get box2 element
    let currentSize = box2.clientWidth; // get the current width of box2
    let newSize = currentSize * 1.1; // calculate the new size of box2
    box2.style.width = newSize + 'px'; // update the width of box2
    box2.style.height = newSize + 'px'; // update the height of box2
  }, 60000);
};