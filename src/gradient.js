var angle = 0;
var elts = document.getElementsByClassName('gradient');
var startColor = "#25E7B8";
var endColor = "#92E93B";

function changeAngle() {
  angle = (angle - 2) % 360;
  if (elts) {
    [...elts].forEach(t => {
      t.style.backgroundImage = `-webkit-linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
    })
  }
}

export function setColors(start, end) {
  startColor = start;
  endColor = end;
  document.documentElement.style.setProperty('--gradient-start', start);
  document.documentElement.style.setProperty('--gradient-end', end);
}

export default function rotateGradient() {
  setInterval(changeAngle, 200);
}
