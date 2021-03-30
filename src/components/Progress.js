import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  height: 70px;
  width: 100%;
  position: relative;
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
`;

const CircleCurrent = styled(Circle)`
  box-shadow: 0px 0px 0px 10px ${props => props.theme.colors.bg} inset;
`;

const CircleComplete = styled(Circle)`
  box-shadow: 0px 0px 0px 3px ${props => props.theme.colors.bg} inset;
`;

const N = 3;
const Progress = (step) => {
  return (
    <Wrapper id="progressLine">
      <Line />
      {Array.from(Array(N)).map((_, index) => {
        if (index === step - 1) {
          return <CircleCurrent key={index} />;
        } else if (index < step - 1) {
          return <CircleComplete key={index} />;
        }
        return <Circle key={index} />;
      })}
    </Wrapper>
  );
};

export default Progress;