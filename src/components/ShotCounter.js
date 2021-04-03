import styled, { css, keyframes } from 'styled-components';
import { createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { rubberBand } from 'react-animations';
import { ReactComponent as ShotGlassFullIcon } from '../assets/shot-glass-full.svg';
import { ReactComponent as ShotGlassEmptyIcon } from '../assets/shot-glass-empty.svg';

const ShotCounterRow = styled(TransitionGroup)`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const shotGlassCSS = css`
  height: 40px;
  width: unset;
  fill: ${props => props.theme.colors.text};
`;

const ShotGlassFull = styled(ShotGlassFullIcon)`
  ${shotGlassCSS}
`;

const inAnimation = keyframes`${rubberBand}`;
const ShotGlassEmpty = styled(ShotGlassEmptyIcon)`
  ${shotGlassCSS}
  animation: 500ms ${inAnimation};
`;

const ShotCounterText = styled.p.attrs(props => ({
  className: 'gradient'
}))`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  margin: 0px;
  margin-bottom: 10px;
`;

const ShotCounter = (props) => {
  const containerRef = createRef(null);
  return (
    <CSSTransition
      in={props.numRandomShots > 0}
      timeout={300}
      classNames='shot-counter'
      mountOnEnter={true}
      unmountOnExit={true}
      nodeRef={containerRef}
    >
      <div ref={containerRef}>
        <ShotCounterText>Shots remaining:</ShotCounterText>
        <ShotCounterRow>
          {[...Array(props.numRandomShots).keys()].map(i => {
            const itemRef = createRef(null);
            return (<CSSTransition
              key={i}
              timeout={300}
              classNames='shot'
              nodeRef={itemRef}
            >
              {i < props.numShotsCompleted ? <ShotGlassEmpty ref={itemRef} /> : <ShotGlassFull ref={itemRef} />}
            </CSSTransition>
            );
          })}
        </ShotCounterRow>
      </div>
    </CSSTransition>
  )
};

export default ShotCounter;