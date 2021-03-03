import styled from 'styled-components';

const Tooltip = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: visibility 0.25s;
  width: 80vw;
  background-color: #01151b;
  color: ${props => props.theme.colors.text};
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  position: absolute;
  z-index: 10;

  bottom: 100%;
  left: 50%;
  margin-left: calc(80vw/-2);
`;

const TooltipWrapper = styled.div`
  position: relative;
`;

export { Tooltip, TooltipWrapper };