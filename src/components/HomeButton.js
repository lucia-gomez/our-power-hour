import styled from "styled-components";
import { ButtonIconStyle } from '../components/ButtonIcon';
import { Link } from '@reach/router';

const Home = styled(ButtonIconStyle)`
  font-size: 5vh;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export default function HomeButton() {
  return (
    <Link to="/">
      <Home active={"true"} className="material-icons gradient" >home</Home>
    </Link>
  );
}