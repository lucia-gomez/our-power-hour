import styled from 'styled-components'

const Header = styled.h1.attrs(props => ({
  className: 'gradient',
}))`
  font-size: -webkit-xxx-large;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 50px auto 0px;
  width: fit-content;
  filter: drop-shadow(${props => props.theme.colors.shadow});
  -webkit-filter: drop-shadow(${props => props.theme.colors.shadow});
`;

export default Header;