var angle = 0;

function changeAngle() {
	angle = (angle - 2) % 360;
	document.documentElement.style.setProperty("--angle", angle + "deg");
}

export function setColors(colors) {
	let g = "";
	for (let i = 0; i < colors.length; i++) {
		g += colors[i];
		if (i < colors.length - 1) {
			g += ", ";
		}
	}
	document.documentElement.style.setProperty("--gradient", g);
}

export default function rotateGradient() {
	setInterval(changeAngle, 200);
}
