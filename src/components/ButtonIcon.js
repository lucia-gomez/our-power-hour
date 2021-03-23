import styled from 'styled-components';
import Header from '../styles/Header';

const ButtonIconStyle = styled(Header)`
  cursor: pointer;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size}px;
  margin: 0px;
  opacity: ${props => props.active ? 1 : 0.4};
  transition: opacity 0.2s;
`;

const ButtonIcon = (props) => {
  return <ButtonIconStyle
    onClick={props.onClick}
    className="material-icons gradient"
    {...props}
  >
    {props.icon}
  </ButtonIconStyle>
};

export { ButtonIcon as default, ButtonIconStyle };