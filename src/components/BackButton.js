import styled from "styled-components";
import { ButtonIconStyle } from '../components/ButtonIcon';
import { Link } from '@reach/router';

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Back = styled(ButtonIconStyle)`
  font-size: 4vh;
`;

const Row = styled.div.attrs(_ => ({
  className: 'gradient'
}))`
  display: flex;
  align-items: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
`;

const BackButton = ({ to }) => {
  return (
    <Container>
      <Link to={to}>
        <Row>
          <Back active={"true"} className="material-icons gradient" >chevron_left</Back>
          Back
        </Row>
      </Link>
    </Container>
  );
}

export default BackButton;