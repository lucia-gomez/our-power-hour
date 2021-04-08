import styled, { css } from 'styled-components';

const placeholder = css`
  color: ${props => props.theme.colors.medium};
  text-align: center;
`;

const Input = styled.input.attrs(props => ({
  className: "gradient",
}))`
  height: 36px;
  width: 30vw;
  min-width: 200px;
  max-width: 500px;
  border: solid 2px transparent;
  border-radius: 100px;
  box-shadow: 0px 0px 50px 50px ${props => props.theme.colors.bg} inset;
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  font-family: ${props => props.theme.font};
  padding: 0px 10px;
  text-align: center;

  ::placeholder {
    ${placeholder}
  }

  ::-ms-input-placeholder {
    ${placeholder}
  }
`;

export default Input;