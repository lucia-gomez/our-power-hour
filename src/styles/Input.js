import styled from 'styled-components';

const Input = styled.input`
  height: 36px;
  width: 200px;
  border: solid 2px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #25E7B8, #92E93B);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 100px;
  box-shadow: 0px 0px 50px 50px ${props => props.theme.colors.bg} inset;
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  padding: 0px 10px;
`;

export default Input;