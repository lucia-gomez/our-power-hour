import './App.css';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from "@reach/router";
import { setColors } from './gradient.js';

import Home from './pages/Home';
import ChoosePlaylist from './pages/ChoosePlaylist';
import ChooseSound from './pages/ChooseSound';
import ChooseName from './pages/ChooseName';
import Playlist from './pages/Playlist';

function App() {
  const gradientStartColor = "#25E7B8";
  const gradientEndColor = "#92E93B";
  const theme = {
    colors: {
      accent: "rgb(6 40 50 / 90%)",
      bg: "#011d25",
      error: '#38464a',
      gradient: `-webkit-linear-gradient(left, ${gradientStartColor}, ${gradientEndColor})`,
      gradientStart: gradientStartColor,
      gradientEnd: gradientEndColor,
      medium: "#143c48",
      text: "#fff",
    },
    font: "'Nunito', sans-serif",
  };

  setColors(gradientStartColor, gradientEndColor);

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
