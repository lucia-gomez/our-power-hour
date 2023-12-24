import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChooseColor from "./pages/ChooseColor";
import ChooseName from "./pages/ChooseName";
import ChoosePlaylist from "./pages/ChoosePlaylist";
import ChooseSound from "./pages/ChooseSound";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Progress from "./components/Progress";
import Provider from "./components/Provider.js";
import { ThemeProvider } from "styled-components";
import { setColors } from "./scripts/gradient.js";
import themes from "./scripts/themes";
import { useState } from "react";

function App() {
	const defaultThemeName = Object.keys(themes)[0];
	const [themeName, setThemeName] = useState(
		localStorage.getItem("powerHourTheme") ?? defaultThemeName
	);
	if (themes[themeName] === undefined) {
		localStorage.setItem("powerHourTheme", defaultThemeName);
		setThemeName(defaultThemeName);
	}
	document.documentElement.style.setProperty("--bg", themes[themeName].bg);

	const materialTheme = {
		colors: themes[themeName],
		font: "'Nunito', sans-serif",
	};

	setColors(themes[themeName].gradientColors);

	return (
		<div className="App">
			<ThemeProvider theme={materialTheme}>
				<Provider>
					<BrowserRouter>
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/1" element={<ChoosePlaylist />} />
							<Route exact path="/2" element={<ChooseSound />} />
							<Route exact path="/3" element={<ChooseName />} />
							<Route
								exact
								path="/4"
								element={<ChooseColor setTheme={setThemeName} />}
							/>
							<Route exact path="/drink" element={<Playlist />} />
						</Routes>
						<Progress />
					</BrowserRouter>
				</Provider>
			</ThemeProvider>
		</div>
	);
}

export default App;
