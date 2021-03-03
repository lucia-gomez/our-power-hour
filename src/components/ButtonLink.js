import { useState } from 'react';
import { Link } from '@reach/router';
import Button from '../styles/Button';
import ButtonPrimary from '../styles/ButtonPrimary';
import { Tooltip, TooltipWrapper } from '../styles/Tooltip';

const ButtonLink = (props) => {
  const [error, toggleError] = useState(false);
  const [showErrorMsg, toggleShowErrorMsg] = useState(false);
  const [numErrors, setNumErrors] = useState(0);

  const onError = () => {
    if (numErrors + 1 > 2) {
      toggleShowErrorMsg(true);
      setTimeout(() => toggleShowErrorMsg(false), 2000);
    }
    setNumErrors(numErrors + 1);
    toggleError(true);
    setTimeout(() => toggleError(false), 250);
  };

  return (
    props.enabled ?
      <Link to={props.to} onClick={props.onClick}>
        {props.secondary ? <Button>{props.text}</Button> : <ButtonPrimary>{props.text}</ButtonPrimary>}
      </Link> :
      <TooltipWrapper>
        {props.errorMsg ? <Tooltip show={showErrorMsg}>{props.errorMsg}</Tooltip> : null}
        <Button onClick={onError} error={error}>{props.text}</Button>
      </TooltipWrapper>
  );
};

export default ButtonLink;