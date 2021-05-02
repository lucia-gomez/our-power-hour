import { Component } from 'react';
import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import VideoContainer from '../styles/Video';
import ReactPlayer from 'react-player/youtube';
import Sidenav from '../components/Sidenav';
import { Link } from '@reach/router';

import Timer from '../components/Timer';
import UIfx from 'uifx';
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
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
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

class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoSkip: 0,
      count: 1,
      justStarted: false,
      muted: false,
      paused: true,
      pauseTimer: null,
      randomShotTimes: [],
      ready: false,
      resumeTimer: null,
      shuffled: false,
    };

    this.handlePlayerPause = this.handlePlayerPause.bind(this);
    this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.replay = this.replay.bind(this);
    this.forward30 = this.forward30.bind(this);
    this.back10 = this.back10.bind(this);
    this.skipSong = this.skipSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.mute = this.mute.bind(this);
    this.onReady = this.onReady.bind(this);
    this.setRandomShots = this.setRandomShots.bind(this);
    this.setTrackNumber = this.setTrackNumber.bind(this);
    this.setAutoSkip = this.setAutoSkip.bind(this);
    this.autoSkip = this.autoSkip.bind(this);

    this.timer = new Timer(this.nextTrack, 60000);
    var mp3 = require('../sounds/' + this.props.sound);
    this.sound = new UIfx(
      mp3.default,
      {
        volume: 1.0,
        throttleMs: 0,
      }
    );

    this.shotsSound = new UIfx(
      ShotsSound,
      {
        volume: 0.7,
        throttleMs: 0,
      }
    );
  }

  render() {
    const isDone = this.state.count > 60;
    const bgImage = isDone ? '/confetti.gif' : null;
    const numShotsCompleted = this.state.randomShotTimes.filter(x => x <= this.state.count).length;
    return (
      <>
        <DrinkPage
          bgImage={process.env.PUBLIC_URL + bgImage}
          path={this.props.path}
          id="player-content"
        >
          <Nav>
            <Sidenav
              autoSkipSlider={this.setAutoSkip}
              count={this.state.count}
              shotsSlider={this.setRandomShots}
              numberSlider={this.setTrackNumber}
              numShotsCompleted={numShotsCompleted}
            >
              {isDone ? null : this.videoControls()}
            </Sidenav>
            <PlaylistName>{this.props.name ?? "Our Power Hour"}</PlaylistName>
            <Link to="/">
              <Home active={"true"} className="material-icons gradient" >home</Home>
            </Link>
          </Nav>
          {isDone ? this.endScreen() : this.videoPlayer()}
        </DrinkPage >
      </>
    );
  }

  videoPlayer() {
    return (
      <VideoContainer>
        <ReactPlayer
          url={`https://www.youtube.com/playlist?list=${this.props.playlistID}`}
          onError={this.skipSong}
          onPlay={this.handlePlayerPlay}
          onPause={this.handlePlayerPause}
          onReady={this.onReady}
          onEnded={this.previousSong}
          controls={true}
          playing={!this.state.paused}
          ref={player => {
            this.player = player
          }}
          config={{
            youtube: {
              onUnstarted: this.autoSkip,
              playerVars: {
                color: "white",
                listType: "playlist",
                list: this.props.playlistID,
                loop: 1,
              }
            }
          }}
          height="100%"
          width="100%"
          style={{ position: 'relative' }}
        />
        <OverlayText>{this.state.count}</OverlayText>
      </VideoContainer>
    );
  }

  videoControls() {
    const primaryButtons = [
      {
        icon: "skip_previous", fn: () => {
          this.previousSong();
          window.umami.trackEvent("Previous track", "nav");
        }, active: true
      },
      {
        icon: this.state.paused ? "play_circle" : "pause_circle",
        fn: this.state.paused ? this.handlePlayerPlay : this.handlePlayerPause,
        active: true,
      },
      {
        icon: "skip_next", fn: () => {
          this.skipSong();
          window.umami.trackEvent("Next track", "nav");
        }, active: true
      },
    ];
    const secondaryButtons = [
      { icon: this.state.muted ? "volume_off" : "volume_up", fn: this.mute, active: this.state.muted },
      { icon: "replay_10", fn: this.back10, active: true },
      { icon: "forward_30", fn: this.forward30, active: true },
      { icon: "shuffle", fn: this.shuffle, active: this.state.shuffled },
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
    return this.state.ready ? controls : null;
  }

  endScreen() {
    window.umami.trackEvent("Finished", "general");
    return (
      <EndScreen>
        <h1>🎉 You survived! 🎉</h1>
        <div>
          <ButtonPrimary onClick={this.replay}>Play Again</ButtonPrimary>
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

  onReady() {
    this.setState({ ready: true });
  }

  nextTrack() {
    this.setState(prev => ({ count: prev.count + 1, paused: false }), () => {
      const count = this.state.count;
      if (count <= 60 && this.state.ready) {
        const sound = this.state.randomShotTimes.includes(count) ? this.shotsSound : this.sound;
        sound.play();
        this.timer.repeat();
        this.skipSong();
      }
    });
  }

  handlePlayerPause() {
    if (!this.state.paused) {
      this.timer.pause();
      this.setState({ paused: true });
    }
  }

  handlePlayerPlay() {
    if (this.state.paused) {
      this.timer.resume()
      if (this.state.justStarted) {
        this.setState({ paused: false });
        this.player.seekTo(this.state.autoSkip);
        this.setState({ justStarted: false });
      } else {
        this.setState({ paused: false });
      }
    }
  }

  replay() {
    this.setState({ count: 1, paused: true, muted: false, shuffled: false });
  }

  forward30() {
    if (this.state.ready) {
      this.player.seekTo(this.player.getCurrentTime() + 30);
      window.umami.trackEvent("Forward 30", "nav");
    }
  }

  back10() {
    if (this.state.ready) {
      this.player.seekTo(this.player.getCurrentTime() - 10);
      window.umami.trackEvent("Back 10", "nav");
    }
  }

  skipSong() {
    if (this.state.ready)
      this.player.getInternalPlayer().nextVideo();
  }

  previousSong() {
    if (this.state.ready)
      this.player.getInternalPlayer().previousVideo();
  }

  autoSkip() {
    this.setState({ justStarted: true });
  }

  shuffle() {
    if (this.state.ready) {
      this.player.getInternalPlayer().setShuffle(!this.state.shuffled);
      this.setState(prev => ({ shuffled: !prev.shuffled }));
      window.umami.trackEvent("Toggle shuffle", "nav");
    }
  }

  mute() {
    if (!this.state.ready)
      return;
    this.setState(prev => ({ muted: !prev.muted }), () => {
      const p = this.player.getInternalPlayer();
      this.state.muted ? p.mute() : p.unMute();
    });
    window.umami.trackEvent("Toggle mute", "nav");
  }

  setRandomShots(n) {
    const times = [];
    while (times.length < n) {
      times.push(Math.floor(Math.random() * 58 + 2));
    }
    this.setState({ randomShotTimes: times });
    // window.umami.trackEvent("Random shots", "nav");
  }

  setTrackNumber(n) {
    this.setState({ count: n });
    // window.umami.trackEvent("Skip to", "nav");
  }

  setAutoSkip(n) {
    this.setState({ autoSkip: n });
    // window.umami.trackEvent("Auto skip", "nav");
  }
}

export default Playlist;