import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ButtonIconStyle } from '../components/ButtonIcon';
import AdvancedSettings from './AdvancedSettings';
import ShotCounter from './ShotCounter';

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

const Sidenav = (props) => {
  const [isOpen, toggleOpen] = useState(true);
  const [numRandomShots, setNumRandomShots] = useState(0);

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

  return (
    <>
      <SidenavBar id="sidenav" >
        <SidenavContent>
          <br />
          {props.children}
          <br />
          {<ShotCounter numRandomShots={numRandomShots} numShotsCompleted={props.numShotsCompleted} />}
          {<AdvancedSettings
            {...props}
            width={WIDTH}
            numRandomShots={numRandomShots}
            setNumRandomShots={setNumRandomShots}
          />}
        </SidenavContent>
      </SidenavBar >
      <SidenavButton onClick={isOpen ? closeNav : openNav} active={"true"} size={30} className="material-icons gradient">
        {isOpen ? "close" : "menu"}
      </SidenavButton>
    </>
  );
};

export default Sidenav;