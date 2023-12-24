import ButtonLink from "../components/ButtonLink";
import Context from "../components/Context";
import Header from "../styles/Header";
import Page from "../styles/Page";
import initializeHowler from "../scripts/initializeHowler";
import styled from "styled-components";
import { useContext } from "react";

const HomePage = styled(Page)`
	background-image: url(${(props) => props.bgImage});
	background-blend-mode: overlay;
	background-repeat: no-repeat;
	background-position: center bottom -10vw;
	background-size: contain;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media only screen and (max-width: 768px) {
		background-position: center bottom;
		background-size: 100vh;
	}
`;

const Home = (props) => {
	const bgImage = process.env.PUBLIC_URL + "/bottles.png";
	const { setHowler } = useContext(Context);

	const createHowler = () => {
		const howler = initializeHowler();
		setHowler(howler);
	};

	return (
		<HomePage path={props.path} bgImage={bgImage}>
			<div>
				<Header>Our Power Hour</Header>
				<p>Use any YouTube playlist for a customized Power Hour experience</p>
			</div>
			<br />
			<ButtonLink
				to="/1"
				text="Get started"
				enabled={"true"}
				onClick={createHowler}
			/>
		</HomePage>
	);
};

export default Home;
