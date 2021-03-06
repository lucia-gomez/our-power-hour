import { Component } from 'react';
import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import VideoContainer from '../styles/Video';
import ReactPlayer from 'react-player/youtube';
import Sidenav from '../components/Sidenav';

import Timer from '../components/Timer';
import UIfx from 'uifx';
import ShotsSound from '../sounds/shots.mp3';

import ButtonIcon from '../components/ButtonIcon';
import ButtonPrimary from '../styles/ButtonPrimary';
import ButtonLink from '../components/ButtonLink';

const DrinkPage = styled(Page)`
  display: grid;
  grid-template-rows: 75px 6fr 1fr;
  background-image: url(${props => props.bgImage}); 
  background-blend-mode: color-dodge;
  background-size: cover;
  padding: 0px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
`;

const PlaylistName = styled(Header)`
  margin: 0px;

  @media only screen and (max-width: 576px) {
    font-size: 30px;
    padding-top: 10px;
  }
`;

const OverlayText = styled.h3`
  position: absolute;
  right: 20px;
  top: 20px;
  width: fit-content;
  text-align:center;
  margin: 0 auto;
  background: ${props => props.theme.colors.gradient};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
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
      count: 1,
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
    return (
      <>
        <DrinkPage
          bgImage={process.env.PUBLIC_URL + bgImage}
          path={this.props.path}
        >
          <Nav>
            <Sidenav setRandomShots={this.setRandomShots} />
            {isDone ? null : <PlaylistName>{this.props.name ?? "Our Power Hour"}</PlaylistName>}
          </Nav>
          {isDone ? this.endScreen() : this.videoPlayer()}
          {isDone ? null : this.videoControls()}
        </DrinkPage >
      </>
    );
  }

  videoPlayer() {
    return (
      <>
        <VideoContainer>
          <ReactPlayer
            url={`https://www.youtube.com/playlist?list=${this.props.playlistID}`}
            onError={this.skipSong}
            onPlay={this.handlePlayerPlay}
            onPause={this.handlePlayerPause}
            onReady={this.onReady}
            controls={true}
            playing={!this.state.paused}
            ref={player => {
              this.player = player
            }}
            config={{
              youtube: {
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
      </>
    );
  }

  videoControls() {
    const buttons = [
      { icon: "volume_off", fn: this.mute, active: this.state.muted },
      { icon: "skip_previous", fn: this.previousSong, active: true },
      { icon: "replay_10", fn: this.back10, active: true },
      {
        icon: this.state.paused ? "play_circle" : "pause_circle",
        fn: this.state.paused ? this.handlePlayerPlay : this.handlePlayerPause,
        active: true,
      },
      { icon: "forward_30", fn: this.forward30, active: true },
      { icon: "skip_next", fn: this.skipSong, active: true },
      { icon: "shuffle", fn: this.shuffle, active: this.state.shuffled },
    ];
    const controls = (
      <ButtonRow>
        {buttons.map((b, i) => {
          const p = Math.abs(i - Math.floor(buttons.length / 2));
          return <ButtonIcon icon={b.icon} onClick={b.fn} active={b.active} size={90 - p * 15} key={i} />;
        })}
      </ButtonRow>
    );
    return this.state.ready ? controls : null;
  }

  endScreen() {
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
        this.player.getInternalPlayer().pauseVideo();
        const sound = this.state.randomShotTimes.includes(count) ? this.shotsSound : this.sound;
        sound.play();
        this.timer.repeat();

        setTimeout(() => {
          this.skipSong();
        }, 1000)
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
      this.setState({ paused: false });
    }
  }

  replay() {
    this.setState({ count: 1, paused: true, muted: false, shuffled: false });
  }

  forward30() {
    if (this.state.ready)
      this.player.seekTo(this.player.getCurrentTime() + 30);
  }

  back10() {
    if (this.state.ready)
      this.player.seekTo(this.player.getCurrentTime() - 10);
  }

  skipSong() {
    if (this.state.ready)
      this.player.getInternalPlayer().nextVideo();
  }

  previousSong() {
    if (this.state.ready)
      this.player.getInternalPlayer().previousVideo();
  }

  shuffle() {
    if (this.state.ready) {
      this.player.getInternalPlayer().setShuffle(!this.state.shuffled);
      this.setState(prev => ({ shuffled: !prev.shuffled }));
    }
  }

  mute() {
    if (!this.state.ready)
      return;
    this.setState(prev => ({ muted: !prev.muted }), () => {
      const p = this.player.getInternalPlayer();
      this.state.muted ? p.mute() : p.unMute();
    });
  }

  setRandomShots(n) {
    const times = [];
    while (times.length < n) {
      times.push(Math.floor(Math.random() * 59 + 1));
    }
    this.setState({ randomShotTimes: times });
  }
}

export default Playlist;