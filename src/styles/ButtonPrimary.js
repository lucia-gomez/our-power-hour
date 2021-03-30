import styled from 'styled-components';
import Button from './Button';

const ButtonPrimary = styled(Button)`
  box-shadow: none;
  color: ${props => props.theme.colors.text};
  width: 200px;
`;

export default ButtonPrimary;