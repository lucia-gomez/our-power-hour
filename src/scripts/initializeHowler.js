import { Howl } from "howler";
const spriteJson = require("../sounds/sounds.json");

export default function initializeHowler() {
	const howler = new Howl({
		src: spriteJson.urls,
		sprite: spriteJson.sprite,
		onload: () => console.info("Audio sprite loaded!"),
		onloaderror: (soundId, err) => console.error(soundId, err),
	});
	return howler;
}
