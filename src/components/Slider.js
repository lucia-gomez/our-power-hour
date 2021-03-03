import styled from 'styled-components';
import { useState } from 'react';

const SliderContainer = styled.div`
  margin: auto;
  width: 90%;
`;

const SliderStyle = styled.input`
  -webkit-appearance: none;  
  appearance: none;
  width: 80%; 
  height: 10px; 
  background: ${props => props.theme.colors.gradient}; 
  border-radius: 100px;
  outline: none; 
  -webkit-transition: .2s; 
  transition: opacity .2s;
  margin-right: 10px;

  ::-webkit-slider-thumb {
    -webkit-appearance: none; 
    appearance: none;
    width: 25px; 
    height: 25px;
    background: ${props => props.theme.colors.text}; 
    border-radius: 100px;
    cursor: pointer; 
  }
`

const Slider = (props) => {
  const [value, setValue] = useState(props.value)
  return (
    <SliderContainer>
      <label>
        {props.name}
        <SliderStyle
          type='range'
          min={props.min}
          max={props.max}
          value={value}
          onInput={e => {
            setValue(e.target.value);
            props.setRandomShots(e.target.value);
          }
          }
        />
        {value}
      </label>
    </SliderContainer>
  );
}

export default Slider;