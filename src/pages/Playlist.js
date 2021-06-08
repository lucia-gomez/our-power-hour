import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import VideoContainer from '../styles/Video';
import ReactPlayer from 'react-player/youtube';
import Sidenav from '../components/Sidenav';
import { Link } from '@reach/router';

import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import ShotsSound from '../sounds/shots.mp3';

import ButtonIcon, { ButtonIconStyle } from '../components/ButtonIcon';
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

const OverlayText = styled.h3.attrs(props => ({
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

const ButtonRow = styled.div`
  align-items: ${props => props.alignItems};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
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

const Playlist = props => {

  const player = useRef(null);

  const {
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({ expiryTimestamp: getTimerTime(), onExpire: nextTrack });

  const [autoSkip, setAutoSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [justStarted, toggleJustStarted] = useState(false);
  const [muted, toggleMuted] = useState(false);
  const [paused, togglePaused] = useState(true);
  const [randomShotTimes, setRandomShotTimes] = useState([]);
  const [ready, toggleReady] = useState(false);
  const [shuffled, toggleShuffled] = useState(false);

  var mp3 = require('../sounds/' + props.sound);

  const [drinkSound] = useSound(mp3.default);
  const [shotsSound] = useSound(ShotsSound);

  const isDone = count > 60;
  const bgImage = isDone ? '/confetti.gif' : null;
  const numShotsCompleted = randomShotTimes.filter(x => x <= count).length;

  const videoPlayer = () => {
    return (
      <VideoContainer>
        <ReactPlayer
          url={`https://www.youtube.com/playlist?list=${props.playlistID}`}
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
                list: props.playlistID,
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
  }

  const videoControls = () => {
    const primaryButtons = [
      {
        icon: "skip_previous", fn: () => {
          previousSong();
          window.umami.trackEvent("Previous track", "nav");
        }, active: true
      },
      {
        icon: paused ? "play_circle" : "pause_circle",
        fn: paused ? handlePlayerPlay : handlePlayerPause,
        active: true,
      },
      {
        icon: "skip_next", fn: () => {
          skipSong();
          window.umami.trackEvent("Next track", "nav");
        }, active: true
      },
    ];
    const secondaryButtons = [
      { icon: muted ? "volume_off" : "volume_up", fn: mute, active: muted },
      { icon: "replay_10", fn: back10, active: true },
      { icon: "forward_30", fn: forward30, active: true },
      { icon: "shuffle", fn: shuffle, active: shuffled },
    ];

    const controls = (
      <div>
        <ButtonRow alignItems="center">
          {primaryButtons.map((b, i) => {
            const p = Math.abs(i - Math.floor(primaryButtons.length / 2));
            return <ButtonIcon icon={b.icon} onClick={b.fn} active={b.active} size={90 - p * 30} key={i} />;
          })}
        </ButtonRow>
        <ButtonRow>
          {secondaryButtons.map((b, i) => {
            const p = Math.floor(Math.abs(i - 1.5));
            return <ButtonIcon icon={b.icon} onClick={b.fn} active={b.active} size={60 - p * 20} key={i} />;
          })}
        </ButtonRow>
      </div>
    );
    return ready ? controls : null;
  }

  const endScreen = () => {
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
    setCount(count + 1);
    if (count <= 60 && ready) {
      (randomShotTimes.includes(count) ? shotsSound : drinkSound)();
      restartTimer(getTimerTime());
      skipSong();
    }
  }

  const handlePlayerPause = () => {
    if (!paused) {
      pauseTimer();
      togglePaused(true);
    }
  }

  const handlePlayerPlay = () => {
    if (paused) {
      resumeTimer();
      togglePaused(false);
      if (justStarted) {
        player.current.seekTo(autoSkip);
        toggleJustStarted(false);
      }
    }
  }

  const replay = () => {
    setCount(1);
    togglePaused(true);
    toggleMuted(false);
    toggleShuffled(false);
  }

  const forward30 = () => {
    if (ready) {
      player.current.seekTo(player.current.getCurrentTime() + 30);
      window.umami.trackEvent("Forward 30", "nav");
    }
  }

  const back10 = () => {
    if (ready) {
      player.current.seekTo(player.current.getCurrentTime() - 10);
      window.umami.trackEvent("Back 10", "nav");
    }
  }

  const skipSong = () => {
    if (ready)
      player.current.getInternalPlayer().nextVideo();
  }

  const previousSong = () => {
    if (ready)
      player.current.getInternalPlayer().previousVideo();
  }

  const shuffle = () => {
    if (ready) {
      toggleShuffled(!shuffled);
      // useEffect to handle player shuffling
      window.umami.trackEvent("Toggle shuffle", "nav");
    }
  }

  useEffect(() => {
    let p = player.current.getInternalPlayer();
    if (ready)
      p.setShuffle(shuffled);
  }, [shuffled, ready])

  const mute = () => {
    if (!ready)
      return;
    toggleMuted(!muted);
    // useEffect to handle player muting
    window.umami.trackEvent("Toggle mute", "nav");
  }

  useEffect(() => {
    let p = player.current.getInternalPlayer();
    if (ready)
      muted ? p.mute() : p.unMute();
  }, [muted, ready]);

  const setRandomShots = n => {
    const times = [];
    while (times.length < n) {
      times.push(Math.floor(Math.random() * 58 + 2));
    }
    setRandomShotTimes(times);
    // window.umami.trackEvent("Random shots", "nav");
  }

  return (
    <>
      <DrinkPage
        bgImage={process.env.PUBLIC_URL + bgImage}
        path={props.path}
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
            {isDone ? null : videoControls()}
          </Sidenav>
          <PlaylistName>{props.name ?? "Our Power Hour"}</PlaylistName>
          <Link to="/">
            <Home active={"true"} className="material-icons gradient" >home</Home>
          </Link>
        </Nav>
        {isDone ? endScreen() : videoPlayer()}
      </DrinkPage >
    </>
  );

}

export default Playlist;