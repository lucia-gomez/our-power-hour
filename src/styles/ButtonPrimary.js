import styled from 'styled-components';
import Button from './Button';

const ButtonPrimary = styled(Button)`
  box-shadow: none;
  color: ${props => props.theme.colors.text};
  // position: absolute;
  // bottom: 30%;
  // left: 50%;
  // -webkit-transform: translateX(-50%);
  width: 200px;
`;

export default ButtonPrimary;