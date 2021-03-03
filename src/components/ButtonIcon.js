import styled from 'styled-components';
import Header from '../styles/Header';

const ButtonIconStyle = styled(Header)`
  background: ${props => props.active ? undefined : props.theme.colors.text};
  cursor: pointer;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size}px;
  margin: 0px;

  @media only screen and (max-width: 576px) {
    font-size: ${props => props.size * 0.75}px;
  }
`;

const ButtonIcon = (props) => {
  return <ButtonIconStyle
    onClick={props.onClick}
    className="material-icons"
    active={props.active}
    size={props.size}
  >
    {props.icon}
  </ButtonIconStyle>
};

export { ButtonIcon as default, ButtonIconStyle };