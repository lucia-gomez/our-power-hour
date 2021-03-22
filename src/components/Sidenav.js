import styled from 'styled-components';
import { useState } from 'react';
import { ButtonIconStyle } from '../components/ButtonIcon';
import Slider from '../components/Slider';
import ButtonLink from '../components/ButtonLink';


const SidenavBar = styled.div`
  height: 100%; 
  width: 0; 
  position: fixed;
  z-index: 1;
  top: 0; 
  left: 0;
  background-color: ${props => props.theme.colors.accent}; 
  color: ${props => props.theme.colors.text};
  overflow-x: hidden; 
  padding-top: 60px; 
  transition: 0.5s;
`;

const SidenavContent = styled.div`
  width: 250px;
`;

const SidenavButton = styled(ButtonIconStyle)`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const Sidenav = (props) => {
  const [isOpen, toggleOpen] = useState(false);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    toggleOpen(!isOpen);
  }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
    toggleOpen(!isOpen);
  }

  return (
    <>
      <SidenavBar id="mySidenav" >
        <SidenavContent>
          <h3>Our Power Hour</h3>
          <ButtonLink
            to="/"
            text="Home"
            enabled={"true"}
            secondary={"true"}
          />
          <br />
          <Slider {...props} name="Random shots" min={0} max={3} value={0} onChange={props.shotsSlider} />
          <Slider {...props} name="Skip to..." min={1} max={60} value={1} onChange={props.numberSlider} />
        </SidenavContent>
      </SidenavBar>
      <SidenavButton onClick={isOpen ? closeNav : openNav} active={"true"} size={30} className="material-icons">menu</SidenavButton>
    </>
  );
};

export default Sidenav;