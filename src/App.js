import './App.css';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from "@reach/router";

import Home from './pages/Home';
import ChooseMode from './pages/ChooseMode';
import ChoosePlaylist from './pages/ChoosePlaylist';
import ChooseSound from './pages/ChooseSound';
import ChooseName from './pages/ChooseName';
import Playlist from './pages/Playlist';

function App() {
  const theme = {
    colors: {
      bg: "#011d25",
      error: '#38464a',
      gradient: "-webkit-linear-gradient(left, #25E7B8, #92E93B)",
      gradientStart: "#25E7B8",
      gradientEnd: "#92E93B",
      medium: "rgb(146 233 59 / 20%)",
      text: "#fff",
    },
    font: "'Nunito', sans-serif",
  };

  const [mode, setMode] = useState(localStorage.getItem("powerHourMode"));
  const [playlistID, setPlaylistID] = useState(localStorage.getItem("powerHourPlaylistID"));
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(localStorage.getItem("powerHourAccessToken"));
  const [sound, setSound] = useState(localStorage.getItem("powerHourSound"));
  const [name, setName] = useState(null);

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Router>
          <Home path="/" />
          <ChooseMode path="/1" setMode={setMode} />
          <ChoosePlaylist
            path="/2"
            mode={mode}
            setPlaylistID={setPlaylistID}
            setSpotifyAccessToken={setSpotifyAccessToken}
          />
          <ChooseSound path="/3" setSound={setSound} />
          <ChooseName path="/4" setName={setName} />
          <Playlist
            path="/drink"
            playlistID={playlistID}
            name={name}
            mode={mode}
            sound={sound}
            spotifyAccessToken={spotifyAccessToken}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
