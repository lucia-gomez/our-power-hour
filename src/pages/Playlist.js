import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import VideoContainer from '../styles/Video';
import ReactPlayer from 'react-player/youtube';
import Sidenav from '../components/Sidenav';
import { Link } from '@reach/router';
import { ButtonIconStyle } from '../components/ButtonIcon';
import PlayerControls from './PlayerControls';

import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import ShotsSound from '../sounds/shots.mp3';

import ButtonPrimary from '../styles/ButtonPrimary';
import ButtonLink from '../components/ButtonLink';

const DrinkPage = styled(Page)`
  display: grid;
  grid-template-rows: 8vh 1fr;
  background-image: url(${props => props.bgImage}); 
  background-blend-mode: ${props => props.theme.colors.isLight ? "screen" : "color-dodge"};
  background-size: cover;
  padding: 0px;
  transition: margin-left .5s;

  @media only screen and (max-width: 768px) {
    margin-left: 0px!important;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const PlaylistName = styled(Header)`
  font-size: 5vh;
  margin: 0px;
  max-width: 70vw;
  overflow-x: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: 576px) {
    font-size: 30px;
    padding-top: 10px;
  }
`;

const OverlayText = styled.h3.attrs(_ => ({
  className: 'gradient'
}))`
  position: absolute;
  right: 20px;
  top: 20px;
  width: fit-content;
  text-align:center;
  margin: 0 auto;
  font-size: 5vh;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;

  @media only screen and (max-height: 812px) {
    font-size: 40px;
  }
`;

const Home = styled(ButtonIconStyle)`
  font-size: 5vh;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const EndScreen = styled.div`
  margin: auto;
  opacity: 0.8;
  @media only screen and (max-width: 576px) {
    h1 {
      font-size: 35px;
    }
  }
`

const TIMER_SEC = 60;
const getTimerTime = () => {
  let time = new Date();
  time.setSeconds(time.getSeconds() + TIMER_SEC);
  return time;
}

const Playlist = ({
  playlistID,
  sound,
  name,
  path
}) => {

  const player = useRef(null);

  const {
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({ expiryTimestamp: getTimerTime(), onExpire: nextTrack });

  const [autoSkip, setAutoSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [justStarted, toggleJustStarted] = useState(false);

  const [paused, togglePaused] = useState(true);
  const [randomShotTimes, setRandomShotTimes] = useState([]);
  const [ready, toggleReady] = useState(false);

  const [drinkSound] = useSound(require('../sounds/' + sound + '.mp3').default, { html5: true });
  const [shotsSound] = useSound(ShotsSound, { html5: true });

  const isDone = count > 60;
  const bgImage = isDone ? '/confetti.gif' : null;
  const numShotsCompleted = randomShotTimes.filter(x => x <= count).length;

  useEffect(() => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      alert("To enable sound effects, turn off silent mode on your device")
    }
  }, [])

  const videoPlayer = (
    <VideoContainer>
      <ReactPlayer
        url={`https://www.youtube.com/playlist?list=${playlistID}`}
        onError={skipSong}
        onPlay={handlePlayerPlay}
        onPause={handlePlayerPause}
        onReady={() => toggleReady(true)}
        onEnded={previousSong}
        controls={true}
        playing={!paused}
        ref={player}
        config={{
          youtube: {
            onUnstarted: () => toggleJustStarted(true),
            playerVars: {
              color: "white",
              listType: "playlist",
              list: playlistID,
              loop: 1,
            }
          }
        }}
        height="100%"
        width="100%"
        style={{ position: 'relative' }}
      />
      <OverlayText>{count}</OverlayText>
    </VideoContainer>
  );

  function endScreen() {
    window.umami.trackEvent("Finished", "general");
    return (
      <EndScreen>
        <h1>🎉 You survived! 🎉</h1>
        <div>
          <ButtonPrimary onClick={replay}>Play Again</ButtonPrimary>
          <ButtonLink
            to="/"
            text="Home"
            enabled={"true"}
            secondary={"true"}
          />
        </div>
      </EndScreen>
    );
  }

  function nextTrack() {
    togglePaused(false);
    (randomShotTimes.includes(count + 1) ? shotsSound : drinkSound)();
    setCount(count + 1);
    if (count <= 60 && ready) {
      restartTimer(getTimerTime());
      skipSong();
    }
  }

  function handlePlayerPause() {
    if (!paused) {
      pauseTimer();
      togglePaused(true);
    }
  }

  function handlePlayerPlay() {
    if (paused) {
      resumeTimer();
      togglePaused(false);
      if (justStarted) {
        player.current.seekTo(autoSkip);
        toggleJustStarted(false);
      }
    }
  }

  function replay() {
    setCount(1);
    togglePaused(true);
  }

  function skipSong() {
    if (ready)
      player.current.getInternalPlayer().nextVideo();
  }

  function previousSong() {
    if (ready)
      player.current.getInternalPlayer().previousVideo();
  }

  function setRandomShots(n) {
    const times = [];
    while (times.length < n) {
      times.push(Math.floor(Math.random() * 58 + 2));
    }
    setRandomShotTimes(times);
    // window.umami.trackEvent("Random shots", "nav");
  }

  return (
    <DrinkPage
      bgImage={process.env.PUBLIC_URL + bgImage}
      path={path}
      id="player-content"
    >
      <Nav>
        <Sidenav
          autoSkipSlider={setAutoSkip}
          count={count}
          shotsSlider={setRandomShots}
          numberSlider={setCount}
          numShotsCompleted={numShotsCompleted}
        >
          {isDone ? null :
            <PlayerControls{...{ player, ready, skipSong, previousSong, handlePlayerPlay, handlePlayerPause, paused }} />
          }
        </Sidenav>
        <PlaylistName>{name ?? "Our Power Hour"}</PlaylistName>
        <Link to="/">
          <Home active={"true"} className="material-icons gradient" >home</Home>
        </Link>
      </Nav>
      {isDone ? endScreen() : videoPlayer}
    </DrinkPage >
  );

}

export default Playlist;