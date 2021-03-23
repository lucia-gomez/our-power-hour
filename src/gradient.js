var angle = 0;

var test = document.getElementsByClassName('gradient');

function changeAngle() {
  angle = (angle - 5) % 360;
  if (test) {
    [...test].forEach(t => {
      t.style.backgroundImage = '-webkit-linear-gradient(' + angle + 'deg, #25E7B8, #e93b8c)';
    })
  }
}

setInterval(changeAngle, 50);