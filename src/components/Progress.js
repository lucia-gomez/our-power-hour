import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  height: 70px;
  width: 100%;
  position: relative;
  display : flex;
  align-items : center;
  justify-content: center;
  &:before {
    content: '';
    color: red;
    border-bottom: 5px solid transparent;
    border-image: linear-gradient(to right, #25E7B8, #92E93B) 1;
    width: 100%;  
    position: absolute;
  }
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border: solid 5px transparent;
  border-radius: 100px;
  background: -webkit-linear-gradient(left, #25E7B8,#92E93B);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

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
    <Wrapper>
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