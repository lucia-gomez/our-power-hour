import styled from 'styled-components';

const VideoContainer = styled.div.attrs(props => ({
  className: 'gradient',
}))`
  height: ${props => props.height};
  margin: 20px auto;
  position: relative;
  width: 95%;
  border-radius: 10px;
  padding: 5px;
`;

export default VideoContainer;