import styled from 'styled-components';
import { useState, createRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Slider from '../components/Slider';
import Icon from '../styles/Icon';


const AdvancedContainer = styled.div`
  overflow: hidden;
`;

const AdvancedButton = styled.button.attrs(props => ({
  className: 'gradient'
}))`
  border: none;
  cursor: pointer;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Nunito';
  width: ${props => props.width}px;
`;

const AdvancedSettings = (props) => {
  const [showAdvanced, toggleShowAdvanced] = useState(false);
  const [autoSkipAmount, setAutoSkipAmount] = useState(0);

  const advancedRef = createRef(null);

  const onClick = () => {
    toggleShowAdvanced(!showAdvanced);
    window.umami.trackEvent('Toggle advanced', 'nav');
  }

  return (
    <>
      <AdvancedButton onClick={onClick}>
        <p>Advanced
            <Icon className='material-icons'>
            {showAdvanced ? "keyboard_arrow_down" : "keyboard_arrow_right"}
          </Icon>
        </p>
      </AdvancedButton>
      <AdvancedContainer>
        <CSSTransition
          in={showAdvanced}
          timeout={300}
          classNames='advanced-settings'
          nodeRef={advancedRef}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div ref={advancedRef}>
            <Slider {...props} name="Random shots" min={0} max={3} value={props.numRandomShots} disabled={props.count > 1} onChange={x => {
              props.shotsSlider(x);
              props.setNumRandomShots(x);
            }} />
            <Slider {...props} name="Skip to..." min={1} max={60} value={props.count} onChange={props.numberSlider} />
            <Slider
              {...props}
              name="Auto skip..."
              min={0}
              max={60}
              value={autoSkipAmount}
              step={5}
              labelFormat={x => x + "s"}
              onChange={x => {
                props.autoSkipSlider(x);
                setAutoSkipAmount(x);
              }}
            />
          </div>
        </CSSTransition>
      </AdvancedContainer>
    </>
  );
};

export default AdvancedSettings;