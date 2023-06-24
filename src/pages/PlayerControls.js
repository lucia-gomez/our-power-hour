import { useEffect, useState } from "react";

import ButtonIcon from "../components/ButtonIcon";
import styled from "styled-components";

const ButtonRow = styled.div`
	align-items: ${(props) => props.alignItems};
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: auto;
`;

const PlayerControls = ({
	player,
	ready,
	skipSong,
	previousSong,
	handlePlayerPlay,
	handlePlayerPause,
	paused,
}) => {
	const [muted, toggleMuted] = useState(false);
	const [shuffled, toggleShuffled] = useState(false);

	const shuffle = () => {
		if (ready) {
			toggleShuffled(!shuffled);
			// useEffect to handle player shuffling
		}
	};

	useEffect(() => {
		let p = player.current.getInternalPlayer();
		if (ready) p.setShuffle(shuffled);
	}, [shuffled, ready, player]);

	const mute = () => {
		if (!ready) return;
		toggleMuted(!muted);
		// useEffect to handle player muting
	};

	useEffect(() => {
		let p = player.current.getInternalPlayer();
		if (ready) muted ? p.mute() : p.unMute();
	}, [muted, ready, player]);

	const forward30 = () => {
		if (ready) {
			player.current.seekTo(player.current.getCurrentTime() + 30);
		}
	};

	const back10 = () => {
		if (ready) {
			player.current.seekTo(player.current.getCurrentTime() - 10);
		}
	};

	const primaryButtons = [
		{
			icon: "skip_previous",
			fn: () => {
				previousSong();
			},
			active: true,
		},
		{
			icon: paused ? "play_circle" : "pause_circle",
			fn: paused ? handlePlayerPlay : handlePlayerPause,
			active: true,
		},
		{
			icon: "skip_next",
			fn: () => {
				skipSong();
			},
			active: true,
		},
	];
	const secondaryButtons = [
		{ icon: muted ? "volume_off" : "volume_up", fn: mute, active: muted },
		{ icon: "replay_10", fn: back10, active: true },
		{ icon: "forward_30", fn: forward30, active: true },
		{ icon: "shuffle", fn: shuffle, active: shuffled },
	];

	const controls = (
		<div>
			<ButtonRow alignItems="center">
				{primaryButtons.map((b, i) => {
					const p = Math.abs(i - Math.floor(primaryButtons.length / 2));
					return (
						<ButtonIcon
							icon={b.icon}
							onClick={b.fn}
							active={b.active}
							size={90 - p * 30}
							key={i}
						/>
					);
				})}
			</ButtonRow>
			<ButtonRow>
				{secondaryButtons.map((b, i) => {
					const p = Math.floor(Math.abs(i - 1.5));
					return (
						<ButtonIcon
							icon={b.icon}
							onClick={b.fn}
							active={b.active}
							size={60 - p * 20}
							key={i}
						/>
					);
				})}
			</ButtonRow>
		</div>
	);
	return ready ? controls : null;
};

export default PlayerControls;
