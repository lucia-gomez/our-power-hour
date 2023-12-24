import { useContext, useState } from "react";

import ButtonLink from "../components/ButtonLink";
import Context from "../components/Context";
import Input from "../styles/Input";
import PageTemplate from "./PageTemplate";

const ChooseName = (props) => {
	const { setName } = useContext(Context);
	const [value, setValue] = useState(null);

	return (
		<PageTemplate
			caption="Name your Power Hour (optional)"
			helpText="The name will be displayed at the top of the screen"
			path={props.path}
		>
			<Input
				onChange={(x) => setValue(x.target.value)}
				placeholder="Our Power Hour"
			/>
			<ButtonLink
				enabled={"true"}
				to="/4"
				text="Next"
				onClick={() => setName(value)}
			/>
		</PageTemplate>
	);
};

export default ChooseName;
