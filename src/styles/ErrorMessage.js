import styled from 'styled-components';

const ErrorMessage = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: visibility 0.25s;
  width: max-content;
  background-color: ${props => props.theme.colors.medium};
  color: ${props => props.theme.colors.text};
  text-align: center;
  border-radius: 6px;
  padding: 5px 20px;

  position: absolute;
  z-index: 10;

  bottom: 100%;
  left: 50%;   
  transform: translate(-50%, -50%);
`;

const ErrorWrapper = styled.div`
  position: relative;
`;

export { ErrorMessage, ErrorWrapper };