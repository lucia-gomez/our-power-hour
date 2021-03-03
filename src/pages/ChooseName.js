import { useState } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';

const ChooseName = (props) => {
  const [value, setValue] = useState(null);

  return (
    <PageTemplate
      title="Step 4"
      caption="Name your Power Hour (optional)"
      path={props.path}
      step={4}
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