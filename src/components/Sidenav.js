import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ButtonIconStyle } from '../components/ButtonIcon';
import Slider from '../components/Slider';

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
      <Slider {...props} name="Random shots" min={0} max={3} value={0} onChange={props.shotsSlider} />
      <Slider {...props} name="Random shots" min={0} max={3} value={numRandomShots} onChange={x => {
        props.shotsSlider(x);
        setNumRandomShots(x);
      }} />
      <Slider {...props} name="Skip to..." min={1} max={60} value={1} onChange={props.numberSlider} />
      <Slider
        {...props}
        name="Auto skip..."
        min={0}
        max={60}
        value={0}
        value={autoSkipAmount}
        step={5}
        labelFormat={x => x + "s"}
        onChange={props.autoSkipSlider}
        onChange={x => {
          props.autoSkipSlider(x);
          setAutoSkipAmount(x);
        }}
      />
    </>
  );

  return (
    <>
      <SidenavBar id="sidenav" >
        <SidenavContent>
          <br />
          {props.children}
          <br />
          {/* {shotCounter} */}
          <AdvancedButton onClick={() => toggleShowAdvanced(!showAdvanced)}>
            <p >Advanced
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