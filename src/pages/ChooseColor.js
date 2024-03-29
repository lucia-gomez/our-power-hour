import ButtonLink from "../components/ButtonLink";
import PageTemplate from "./PageTemplate";
import ScrollableGrid from "../styles/ScrollableGrid";
import styled from "styled-components";
import themes from "../scripts/themes";
import { useState } from "react";

const CIRCLE_SIZE = 90;

const ColorScheme = styled.svg`
	cursor: pointer;
	height: ${CIRCLE_SIZE}px;
	width: ${CIRCLE_SIZE}px;
	margin-right: 15px;
	margin-bottom: 20px;
`;

const ColorCircle = styled.circle`
	cx: ${CIRCLE_SIZE / 2};
	cy: ${CIRCLE_SIZE / 2};
`;

const ChooseColor = (props) => {
	const [selected, setSelected] = useState(
		localStorage.getItem("powerHourTheme") ?? Object.keys(themes)[0]
	);

	const clickTheme = (themeName) => {
		setSelected(themeName);
		props.setTheme(themeName);
		localStorage.setItem("powerHourTheme", themeName);
		window.gtag("event", "theme", {
			themeName,
		});
	};

	const defineGradient = (theme) => {
		return (
			<defs>
				<linearGradient id={theme[0] + "Gradient"}>
					{theme[1].gradientColors.map((color, i) => {
						const offset = (100 / (theme[1].gradientColors.length - 1)) * i;
						return <stop stopColor={color} offset={offset + "%"} key={i} />;
					})}
				</linearGradient>
			</defs>
		);
	};

	return (
		<PageTemplate caption="Choose a color scheme (optional)" path={props.path}>
			<p>{selected.replaceAll("-", " ")}</p>
			<ScrollableGrid>
				{Object.entries(themes).map((theme, i) => (
					<ColorScheme onClick={() => clickTheme(theme[0])} key={i}>
						{defineGradient(theme)}
						<ColorCircle
							r={CIRCLE_SIZE / 2}
							fill={`url(#${theme[0]}Gradient)`}
						/>
						<ColorCircle r={(CIRCLE_SIZE / 2) * 0.8} fill={theme[1].bg} />
					</ColorScheme>
				))}
			</ScrollableGrid>
			<ButtonLink enabled={"true"} to="/drink" text="Next" />
		</PageTemplate>
	);
};

export default ChooseColor;
