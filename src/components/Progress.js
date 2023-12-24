import styled, { keyframes } from "styled-components";

import { rubberBand } from "react-animations";
import { useLocation } from "react-router-dom";

const N = 4;
const icons = ["queue_music", "notifications", "edit", "palette"];

const Wrapper = styled.div`
	height: 70px;
	width: 100%;
	position: absolute;
	bottom: 2%;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Line = styled.span.attrs((props) => ({
	className: "gradient",
}))`
	position: absolute;
	height: 5px;
	width: 100%;
`;

const Circle = styled.div.attrs((props) => ({
	className: "gradient",
}))`
	width: 60px;
	height: 60px;
	border: solid 5px transparent;
	border-radius: 100px;
	box-shadow: 0px 0px 50px 50px ${(props) => props.theme.colors.bg} inset;
	margin: 0px 10px;
	z-index: 1;
	position: relative;
	transition: box-shadow 0.2s;
`;

const inAnimation = keyframes`${rubberBand}`;
const CircleCurrent = styled(Circle)`
	box-shadow: 0px 0px 0px 10px ${(props) => props.theme.colors.bg} inset;
	animation: 500ms ${inAnimation};
`;

const CircleComplete = styled(Circle)`
	box-shadow: 0px 0px 0px 3px ${(props) => props.theme.colors.bg} inset;
`;

const CircleContainer = styled.div`
	position: relative;
`;

const CircleIcon = styled.i.attrs((_) => ({
	className: "material-icons",
}))`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: ${(props) => props.theme.colors.text};
	font-size: 30px;
	z-index: 3;
`;

function CircleLabel(child, key) {
	return (
		<CircleContainer key={key}>
			<CircleIcon>{icons[key]}</CircleIcon>
			{child}
		</CircleContainer>
	);
}

function Progress() {
	const location = useLocation();
	const path = location.pathname.substring(1);
	const step = isNaN(path) ? 0 : Number(path);

	if (step === 0) {
		return null;
	}

	return (
		<Wrapper id="progressLine">
			<Line />
			{Array.from(Array(N)).map((_, index) => {
				if (index === step - 1) {
					return CircleLabel(<CircleCurrent />, index);
				} else if (index < step - 1) {
					return CircleLabel(<CircleComplete />, index);
				}
				return CircleLabel(<Circle />, index);
			})}
		</Wrapper>
	);
}

export default Progress;
