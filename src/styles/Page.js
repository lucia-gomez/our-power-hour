import styled from 'styled-components'

const Page = styled.div`
  background-color: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.text};
  position: relative;
  height: 100vh;
  padding: 0px 10px;
  transition: all 0.2s;
`;

export default Page;