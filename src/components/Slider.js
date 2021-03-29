import styled from 'styled-components';
import { useState } from 'react';

const SliderContainer = styled.div`
  margin: 20px auto;
  width: 90%;
`;

const SliderRow = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 35px;
`;

const SliderStyle = styled.input.attrs(props => ({
  className: 'gradient'
}))`
  -webkit-appearance: none;  
  appearance: none;
  height: 10px; 
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
        <SliderRow>
          <SliderStyle
            type='range'
            min={props.min}
            max={props.max}
            step={props.step ?? 1}
            value={value}
            onInput={e => {
              setValue(e.target.value);
              props.onChange(Number(e.target.value));
            }
            }
          />
          {props.labelFormat ? props.labelFormat(value) : value}
        </SliderRow>
      </label>
    </SliderContainer>
  );
}

export default Slider;
