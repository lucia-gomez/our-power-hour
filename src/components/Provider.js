import React, { useState } from "react";

import Context from "./Context";

const Provider = ({ children }) => {
	const [howler, setHowler] = useState(null);

	const [playlistID, setPlaylistID] = useState(
		localStorage.getItem("powerHourPlaylistID")
	);
	const [sound, setSound] = useState(localStorage.getItem("powerHourSound"));
	const [name, setName] = useState(null);

	return (
		<Context.Provider
			value={{
				howler,
				setHowler,
				playlistID,
				setPlaylistID,
				sound,
				setSound,
				name,
				setName,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
