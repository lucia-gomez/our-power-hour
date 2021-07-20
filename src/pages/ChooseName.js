import { useState } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';

const ChooseName = (props) => {
  const [value, setValue] = useState(null);
  const [share, setShare] = useState(true);

  const stepNum = Number(props.path.substring(1));

  const handleClick = () => {
    props.setName(value);
    if (share) {
      props.sharePowerHour();
    }
  }

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption="Name your Power Hour (optional)"
      helpText="The name will be displayed at the top of the screen"
      path={props.path}
      step={stepNum}
    >
      <Input onChange={x => setValue(x.target.value)} placeholder="Our Power Hour" />
      <label>
        <input
          type="checkbox"
          defaultChecked="checked"
          onChange={e => setShare(e.target.value)}
        />
        Recommend this Power Hour to others
      </label>
      <ButtonLink
        enabled={"true"}
        to="/drink"
        text="Next"
        onClick={handleClick} />
    </PageTemplate >
  );
};

export default ChooseName;