import { useState } from 'react';
import PageTemplate from './PageTemplate';
import Button from '../styles/Button';
import ButtonPrimary from '../styles/ButtonPrimary';
import ButtonLink from '../components/ButtonLink';

const ChooseMode = (props) => {
  const [active, setActive] = useState(null);
  const onClick = (mode, idx) => {
    localStorage.setItem("powerHourMode", mode);
    props.setMode(mode);
    setActive(idx);
  };

  const buttons = ["YouTube"];
  return (
    <PageTemplate
      title="Step 1"
      caption="Use a playlist from Spotify or YouTube?"
      path={props.path}
      step={1}
    >
      <div>
        {buttons.map((name, idx) =>
          active === idx ?
            <ButtonPrimary onClick={() => onClick(name, idx)} key={idx}>{name}</ButtonPrimary> :
            <Button onClick={() => onClick(name, idx)} key={idx}>{name}</Button>
        )}
      </div>
      <ButtonLink
        to="/2"
        text="Next"
        enabled={active !== null ? 1 : 0}
        errorMsg="Select one of the options"
      />

    </PageTemplate >
  );
};

export default ChooseMode;