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
import Playlist from './pages/Playlist';

function App() {
  const [themeColors, setThemeColors] = useState(themes.blueGreen);
  const theme = {
    colors: themeColors,
    font: "'Nunito', sans-serif",
  };

  setColors(themeColors.gradientStart, themeColors.gradientEnd);

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
