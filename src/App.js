import './App.css';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from "@reach/router";
import { setColors } from './gradient.js';
import themes from './styles/themes';

import Home from './pages/Home';
import ChoosePlaylist from './pages/ChoosePlaylist';
import ChooseSound from './pages/ChooseSound';
import ChooseName from './pages/ChooseName';
import ChooseColor from './pages/ChooseColor';
import Playlist from './pages/Playlist';

function App() {
  const defaultThemeName = Object.keys(themes)[0];
  const [themeName, setThemeName] = useState(localStorage.getItem("powerHourTheme") ?? defaultThemeName);
  if (themes[themeName] === undefined) {
    localStorage.setItem("powerHourTheme", defaultThemeName);
    setThemeName(defaultThemeName);
  }

  const theme = {
    colors: themes[themeName],
    font: "'Nunito', sans-serif",
  };

  setColors(themes[themeName].gradientColors);

  const [playlistID, setPlaylistID] = useState(localStorage.getItem("powerHourPlaylistID"));
  const [sound, setSound] = useState(localStorage.getItem("powerHourSound"));
  const [name, setName] = useState(null);

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Router>
          <Home path="/" />
          <ChoosePlaylist
            path="/1"
            setPlaylistID={setPlaylistID}
          />
          <ChooseSound path="/2" setSound={setSound} />
          <ChooseName path="/3" setName={setName} />
          <ChooseColor path="/4" setTheme={setThemeName} />
          <Playlist
            path="/drink"
            playlistID={playlistID}
            name={name}
            sound={sound}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
