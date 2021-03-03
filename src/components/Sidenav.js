import styled from 'styled-components';
import { useState } from 'react';
import ButtonIcon, { ButtonIconStyle } from '../components/ButtonIcon';
import { Link } from '@reach/router';
import Header from '../styles/Header';
import Slider from '../components/Slider';

const SidenavBar = styled.div`
  height: 100%; 
  width: 0; 
  position: fixed;
  z-index: 1;
  top: 0; 
  left: 0;
  background-color: #111; 
  color: ${props => props.theme.colors.text};
  overflow-x: hidden; 
  padding-top: 60px; 
  transition: 0.5s;
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
        <Header>Our Power Hour</Header>
        <Link to="/"><ButtonIcon icon="home" /></Link>
        <br />
        <Slider {...props} name="Random shots" min={0} max={3} value={0} />
      </SidenavBar>
      <SidenavButton onClick={isOpen ? closeNav : openNav} active={"true"} size={30} className="material-icons">menu</SidenavButton>
    </>
  );
};

export default Sidenav;