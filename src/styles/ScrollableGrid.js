import styled from 'styled-components';

const ScrollableGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 75%;
  overflow-y: auto;
  width: 70%;
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.medium};
    border-radius: 100px;
  }

  ::-webkit-scrollbar {
    background: none;
    width: 10px;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`;

export default ScrollableGrid;