import styled from 'styled-components';

const Button = styled.button`
  border: solid 2px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #25E7B8, #92E93B);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 100px;
  box-shadow: 0px 0px 50px 50px ${props => props.error ? props.theme.colors.error : props.theme.colors.bg} inset;
  transition: box-shadow 0.25s;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  display: block;
  font-family: ${props => props.theme.font};
  font-size: 32px;
  margin: 10px auto;
  padding: 5px 10px;
  width: 200px;
`;

export default Button;