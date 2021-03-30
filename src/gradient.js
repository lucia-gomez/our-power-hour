var angle = 0;

function changeAngle() {
  angle = (angle - 2) % 360;
  document.documentElement.style.setProperty('--angle', angle + "deg");
}

export function setColors(start, end) {
  document.documentElement.style.setProperty('--gradient-start', start);
  document.documentElement.style.setProperty('--gradient-end', end);
}

export default function rotateGradient() {
  setInterval(changeAngle, 200);
}
