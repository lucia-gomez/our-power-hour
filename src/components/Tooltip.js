import styled from 'styled-components';
import Icon from '../styles/Icon';

const Container = styled.div`
  display: inline;
  position: relative;

  span {
    visibility: hidden;
    width: max-content;
    max-width: 200px;
    background-color: ${props => props.theme.colors.medium};
    color: ${props => props.theme.colors.text};
    font-size: 18px;
    text-align: center;
    border-radius: 6px;
    padding: 5px 20px;
  
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-90%, 10%);
    z-index: 1;
  }

  :hover span {
    visibility: visible;
  }

  span::after {
    content: " ";
    position: absolute;
    bottom: 100%; 
    left: 90%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${props => props.theme.colors.medium} transparent;
  }
`;

const Tooltip = props => {
  return (
    <Container>
      <Icon className='material-icons' style={{ paddingBottom: '5px' }}>help</Icon>
      <span>{props.text}</span>
    </Container>
  );
}

export default Tooltip;