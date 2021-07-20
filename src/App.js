import './App.css';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Location } from "@reach/router";
import $ from 'jquery';

import { setColors } from './scripts/gradient.js';
import themes from './scripts/themes';

import Home from './pages/Home';
import ChoosePlaylist from './pages/ChoosePlaylist';
import ChooseSound from './pages/ChooseSound';
import ChooseName from './pages/ChooseName';
import ChooseColor from './pages/ChooseColor';
import Playlist from './pages/Playlist';
import Progress from './components/Progress';

function App() {
  const defaultThemeName = Object.keys(themes)[0];
  const [themeName, setThemeName] = useState(localStorage.getItem("powerHourTheme") ?? defaultThemeName);
  if (themes[themeName] === undefined) {
    localStorage.setItem("powerHourTheme", defaultThemeName);
    setThemeName(defaultThemeName);
  }

  document.documentElement.style.setProperty('--bg', themes[themeName].bg);
  const theme = {
    colors: themes[themeName],
    font: "'Nunito', sans-serif",
  };

  setColors(themes[themeName].gradientColors);

  const [playlistID, setPlaylistID] = useState(localStorage.getItem("powerHourPlaylistID"));
  const [sound, setSound] = useState(localStorage.getItem("powerHourSound"));
  const [name, setName] = useState(null);
  const [playlistName, setPlaylistName] = useState(null);

  const useDatabasePowerHour = row => {
    setPlaylistID(row.playlist_id);
    setSound(row.sound);
    setName(row.name);
    setThemeName(row.theme);
    localStorage.setItem("powerHourPlaylistID", row.playlist_id);
    localStorage.setItem("powerHourSound", row.sound);
    localStorage.setItem("powerHourTheme", row.theme);
  }

  const sharePowerHour = () => {
    $.ajax({
      url: "http://localhost:3001/api",
      type: "post",
      data: {
        playlist_id: playlistID,
        playlist_name: playlistName,
        sound: sound,
        name: name ?? 'Our Power Hour',
        theme: themeName ?? 'Default',
      }
    });
  }

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Location>
          {({ location }) => {
            const path = location.pathname.substring(1);
            const step = isNaN(path) ? 0 : Number(path);

            return (
              <>
                <Router>
                  <Home path="/" {...{ useDatabasePowerHour }} />
                  <ChoosePlaylist path="/1" {...{ setPlaylistID, setPlaylistName }} />
                  <ChooseSound path="/2" setSound={setSound} />
                  <ChooseColor path="/3" setTheme={setThemeName} />
                  <ChooseName path="/4" {...{ setName, sharePowerHour }} />
                  <Playlist
                    path="/drink"
                    playlistID={playlistID}
                    name={name}
                    sound={sound}
                  />
                </Router>
                {step > 0 ? Progress(step) : null}
              </>
            )
          }}
        </Location>
      </ThemeProvider>
    </div>
  );
}

export default App;
