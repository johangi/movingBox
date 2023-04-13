const box = document.getElementById('box');
let boxLeft = window.innerWidth / 2 - box.offsetWidth / 2;
let boxTop = window.innerHeight / 2 - box.offsetHeight / 2;

box.style.left = boxLeft + 'px';
box.style.top = boxTop + 'px';

document.addEventListener('keydown', function(event) {
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
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

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