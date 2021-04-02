import styled, { css, keyframes } from 'styled-components';
import { useState, useEffect, createRef } from 'react';
import { rubberBand } from 'react-animations';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ButtonIconStyle } from '../components/ButtonIcon';
import Slider from '../components/Slider';
import { ReactComponent as ShotGlassFullIcon } from '../assets/shot-glass-full.svg';
import { ReactComponent as ShotGlassEmptyIcon } from '../assets/shot-glass-empty.svg';


const WIDTH = 250;

const SidenavBar = styled.div`
  height: calc(100% - 6vh); 
  height: -webkit-calc(100% - 6vh);
  height: -moz-calc(100% - 6vh);
  width: 0; 
  position: fixed;
  z-index: 1;
  top: 0; 
  left: 0;
  background-color: ${props => props.theme.colors.accent}; 
  color: ${props => props.theme.colors.text};
  overflow-x: hidden; 
  padding-top: 6vh; 
  transition: 0.5s;
`;

const SidenavContent = styled.div`
  width: ${WIDTH}px;
`;

const SidenavButton = styled(ButtonIconStyle)`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 10;
  font-size: 5vh;
`;

const AdvancedButton = styled.button.attrs(props => ({
  className: 'gradient'
}))`
  border: none;
  cursor: pointer;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Nunito';
  width: ${WIDTH}px;
`;

const Icon = styled.i`
  padding-left: 5px;
  vertical-align: middle;
`;

const ShotCounterRow = styled(TransitionGroup)`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const shotGlassCSS = css`
  height: 40px;
  width: unset;
  fill: ${props => props.theme.colors.text};
`;

const ShotGlassFull = styled(ShotGlassFullIcon)`
  ${shotGlassCSS}
`;

const inAnimation = keyframes`${rubberBand}`;
const ShotGlassEmpty = styled(ShotGlassEmptyIcon)`
  ${shotGlassCSS}
  animation: 500ms ${inAnimation};
`;

const ShotCounterText = styled.p.attrs(props => ({
  className: 'gradient'
}))`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  margin: 0px;
  margin-bottom: 10px;
`;

const Sidenav = (props) => {
  const [isOpen, toggleOpen] = useState(true);
  const [showAdvanced, toggleShowAdvanced] = useState(false);
  const [numRandomShots, setNumRandomShots] = useState(0);
  const [autoSkipAmount, setAutoSkipAmount] = useState(0);

  const openNav = () => {
    document.getElementById("sidenav").style.width = WIDTH + "px";
    document.getElementById("player-content").style.marginLeft = WIDTH + "px";
    toggleOpen(true);
  }

  const closeNav = () => {
    document.getElementById("sidenav").style.width = "0px";
    document.getElementById("player-content").style.marginLeft = "0px";
    toggleOpen(false);
  }

  useEffect(() => {
    openNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const advanced = (
    <>
      <Slider {...props} name="Random shots" min={0} max={3} value={numRandomShots} disabled={props.lockRandomShots} onChange={x => {
        props.shotsSlider(x);
        setNumRandomShots(x);
      }} />
      <Slider {...props} name="Skip to..." min={1} max={60} value={1} onChange={props.numberSlider} />
      <Slider
        {...props}
        name="Auto skip..."
        min={0}
        max={60}
        value={autoSkipAmount}
        step={5}
        labelFormat={x => x + "s"}
        onChange={x => {
          props.autoSkipSlider(x);
          setAutoSkipAmount(x);
        }}
      />
    </>
  );

  const containerRef = createRef(null);
  const shotCounter = (
    <CSSTransition
      in={numRandomShots > 0}
      timeout={300}
      classNames='shot-counter'
      mountOnEnter={true}
      unmountOnExit={true}
      nodeRef={containerRef}
    >
      <div ref={containerRef}>
        <ShotCounterText>Shots remaining:</ShotCounterText>
        <ShotCounterRow>
          {[...Array(numRandomShots).keys()].map(i => {
            const itemRef = createRef(null);
            return (<CSSTransition
              key={i}
              timeout={300}
              classNames='shot'
              nodeRef={itemRef}
            >
              {i < props.numShotsCompleted ? <ShotGlassEmpty ref={itemRef} /> : <ShotGlassFull ref={itemRef} />}
            </CSSTransition>
            );
          })}
        </ShotCounterRow>
      </div>
    </CSSTransition>
  );

  return (
    <>
      <SidenavBar id="sidenav" >
        <SidenavContent>
          <br />
          {props.children}
          <br />
          {shotCounter}
          <AdvancedButton onClick={() => toggleShowAdvanced(!showAdvanced)}>
            <p>Advanced
            <Icon className='material-icons'>
                {showAdvanced ? "keyboard_arrow_down" : "keyboard_arrow_right"}
              </Icon>
            </p>
          </AdvancedButton>
          {showAdvanced ? advanced : null}
        </SidenavContent>
      </SidenavBar>
      <SidenavButton onClick={isOpen ? closeNav : openNav} active={"true"} size={30} className="material-icons gradient">
        {isOpen ? "close" : "menu"}
      </SidenavButton>
    </>
  );
};

export default Sidenav;