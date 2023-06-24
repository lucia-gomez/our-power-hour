import styled, { css } from "styled-components";

import Button from "../styles/Button";
import ButtonLink from "../components/ButtonLink";
import ButtonPrimary from "../styles/ButtonPrimary";
import PageTemplate from "./PageTemplate";
import ScrollableGrid from "../styles/ScrollableGrid";
import useSound from "use-sound";
import { useState } from "react";

const flexibleBtn = css`
	margin: 10px 3px;
	width: fit-content;
	@media only screen and (max-width: 576px) {
		margin: 10px auto;
		width: 250px;
	}
`;

const ButtonPrimaryFlexible = styled(ButtonPrimary)`
	${flexibleBtn}
`;

const ButtonFlexible = styled(Button)`
	${flexibleBtn}
`;

const spriteJson = require("../sounds/sounds.json");

const ChooseSound = (props) => {
	const mp3 = require("../sounds/result.mp3").default;
	const [playSound, { stop: stopSound }] = useSound(mp3, {
		sprite: spriteJson.sprite,
	});

	let sounds = [
		{ label: "Buzzer", id: "buzzer" },
		{ label: "Ding", id: "ding" },
		{ label: "Quack", id: "quack" },
		{ label: "Titty Sprinkles", id: "titty-sprinkles" },
		{ label: "Drank", id: "drank" },
		{ label: "Airhorn", id: "airhorn" },
		{ label: "Windows", id: "windows" },
		{ label: "Circle", id: "circle" },
		{ label: "Frog", id: "frog" },
		{ label: "Oh Yeah", id: "oh-yeah" },
		{ label: "Power Up", id: "power-up" },
		{ label: "Super Mario", id: "super-mario" },
		{ label: "Taco Bell", id: "taco-bell" },
		{ label: "Waluigi", id: "waluigi" },
		{ label: "Yeet", id: "yeet" },
		{ label: "You What?", id: "you-what" },
		{ label: "Toad", id: "toad" },
		{ label: "Law & Order", id: "law-and-order" },
		{ label: "Ka-ching", id: "ka-ching" },
		{ label: "Diagonally", id: "diagonally" },
	];
	sounds = sounds.sort((a, b) => a.label.localeCompare(b.label));

	const [active, setActive] = useState(null);
	const onClick = (sound, idx) => {
		stopSound();
		playSound({ id: sound });
		localStorage.setItem("powerHourSound", sound);
		props.setSound(sound);
		setActive(idx);
		window.gtag("event", "sound", {
			sound,
		});
	};

	const chooseRandom = () => {
		const sound = sounds[Math.floor(Math.random() * sounds.length)].id;
		localStorage.setItem("powerHourSound", sound);
		props.setSound(sound);
		setActive(-1);
	};

	const getButton = (idx, label, onClick) => {
		return active === idx ? (
			<ButtonPrimaryFlexible onClick={onClick} key={idx}>
				{label}
			</ButtonPrimaryFlexible>
		) : (
			<ButtonFlexible onClick={onClick} key={idx}>
				{label}
			</ButtonFlexible>
		);
	};

	const stepNum = Number(props.path.substring(1));

	return (
		<PageTemplate
			title={"Step " + stepNum}
			caption="Choose a timer sound effect"
			helpText="You'll drink when you hear this sound"
			path={props.path}
			step={stepNum}
		>
			<ScrollableGrid>
				{getButton(-1, "???", chooseRandom)}
				{sounds.map((sound, idx) => {
					const click = () => onClick(sound.id, idx);
					return getButton(idx, sound.label, click);
				})}
			</ScrollableGrid>
			<ButtonLink
				to={"/" + (stepNum + 1)}
				text="Next"
				enabled={active !== null ? 1 : 0}
				errorMsg="Click on one of the above sounds"
			/>
		</PageTemplate>
	);
};

export default ChooseSound;
