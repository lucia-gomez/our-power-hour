import Header from "../styles/Header";
import Page from "../styles/Page";
import Tooltip from "../components/Tooltip";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const StepPage = styled(Page)`
	display: grid;
	grid-template-rows: 200px 1fr 100px;
	overflow: hidden;
`;

const StepPageContent = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	overflow: hidden;
`;

const Caption = styled.p`
	margin: 0;
	display: inline;
`;

const PageTemplate = (props) => {
	const location = useLocation();
	const path = location.pathname.substring(1);
	const step = isNaN(path) ? 0 : Number(path);

	return (
		<StepPage>
			<div>
				<Header className="gradient">{"Step " + step}</Header>
				{props.caption ? <Caption>{props.caption}</Caption> : null}
				{props.helpText ? <Tooltip text={props.helpText} /> : null}
			</div>
			<StepPageContent>{props.children}</StepPageContent>
		</StepPage>
	);
};

export default PageTemplate;
