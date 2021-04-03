import styled from 'styled-components';

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
  opacity: ${props => props.disabled ? 0.4 : 1};

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
            value={props.value}
            disabled={props.disabled}
            onInput={e => {
              props.onChange(Number(e.target.value));
            }
            }
          />
          {props.labelFormat ? props.labelFormat(props.value) : props.value}
        </SliderRow>
      </label>
    </SliderContainer>
  );
}

export default Slider;
export { SliderStyle };