import styled from 'styled-components';

const VideoContainer = styled.div`
  height: ${props => props.height};
  margin: 20px auto;
  position: relative;
  width: 95%;
  background: ${props => props.theme.colors.gradient};
  border-radius: 10px;
  padding: 5px;
`;

export default VideoContainer;