import { useState } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';

const ChooseName = (props) => {
  const [value, setValue] = useState(null);

  const stepNum = Number(props.path.substring(1));

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption="Name your Power Hour (optional)"
      path={props.path}
      step={stepNum}
    >
      <Input onChange={x => setValue(x.target.value)} />
      <ButtonLink
        enabled={"true"}
        to="/drink"
        text="Next"
        onClick={() => props.setName(value)} />
    </PageTemplate >
  );
};

export default ChooseName;