import styled, { keyframes } from 'styled-components';
import { rubberBand } from 'react-animations';

const N = 4;
const icons = ["🎶", "🔈", "✏️", "🎨"];

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  height: 70px;
  width: 100%;
  position: absolute;
  bottom: 2%;
  left: 0;
  display : flex;
  align-items : center;
  justify-content: center;
`;

const Line = styled.span.attrs(props => ({
  className: "gradient"
}))`
  position: absolute;
  height: 5px;
  width: 100%;
`;

const Circle = styled.div.attrs(props => ({
  className: "gradient",
}))`
  width: 60px;
  height: 60px;
  border: solid 5px transparent;
  border-radius: 100px;
  box-shadow: 0px 0px 50px 50px ${props => props.theme.colors.bg} inset;
  margin: 0px 10px;
  z-index: 10;
  position: relative;

  ::before {
    content: "${props => icons[props.index]}";
    font-size: 30px;
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translateX(-50%);
  }
`;

const inAnimation = keyframes`${rubberBand}`;
const CircleCurrent = styled(Circle)`
  box-shadow: 0px 0px 0px 10px ${props => props.theme.colors.bg} inset;
  animation: 500ms ${inAnimation};
`;

const CircleComplete = styled(Circle)`
  box-shadow: 0px 0px 0px 3px ${props => props.theme.colors.bg} inset;
`;

const Progress = (step) => {
  return (
    <Wrapper id="progressLine">
      <Line />
      {Array.from(Array(N)).map((_, index) => {
        if (index === step - 1) {
          return <CircleCurrent key={index} index={index} />;
        } else if (index < step - 1) {
          return <CircleComplete key={index} index={index} />;
        }
        return <Circle key={index} index={index} />;
      })}
    </Wrapper>
  );
};

export default Progress;