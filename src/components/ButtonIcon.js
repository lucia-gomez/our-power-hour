import styled from 'styled-components';
import Header from '../styles/Header';

const ButtonIconStyle = styled(Header)`
  cursor: pointer;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size}px;
  margin: 0px;
  opacity: ${props => props.active ? 1 : 0.4};

  @media only screen and (max-width: 576px) {
    font-size: ${props => props.size * 0.75}px;
  }
`;

const ButtonIcon = (props) => {
  return <ButtonIconStyle
    onClick={props.onClick}
    className="material-icons"
    {...props}
  >
    {props.icon}
  </ButtonIconStyle>
};

export { ButtonIcon as default, ButtonIconStyle };