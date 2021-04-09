import { useState } from 'react';
import styled, { css } from 'styled-components';
import PageTemplate from './PageTemplate';
import ScrollableGrid from '../styles/ScrollableGrid';
import ButtonPrimary from '../styles/ButtonPrimary';
import ButtonLink from '../components/ButtonLink';
import Button from '../styles/Button';
import UIfx from 'uifx';

const flexibleBtn = css`
margin: 10px 3px;
  width: fit-content;
  @media only screen and (max-width: 576px) {
    margin: 10px auto;
    width: 250px;
  }
`;

const ButtonPrimaryFlexible = styled(ButtonPrimary)`
  ${flexibleBtn}
`;

const ButtonFlexible = styled(Button)`
  ${flexibleBtn}
`;

const ChooseSound = (props) => {
  let sounds = [
    { label: "Buzzer", filename: "buzzer.mp3" },
    { label: "Ding", filename: "ding.mp3" },
    { label: "Quack", filename: "quack.mp3" },
    { label: "Titty Sprinkles", filename: "titty-sprinkles.mp3" },
    { label: "Drank", filename: "drank.mp3" },
    { label: "Airhorn", filename: "airhorn.mp3" },
    { label: "Windows", filename: "windows.mp3" },
    { label: "Circle", filename: "circle.mp3" },
    { label: "Frog", filename: "frog.mp3" },
    { label: "Oh Yeah", filename: "oh-yeah.mp3" },
    { label: "Power Up", filename: "power-up.mp3" },
    { label: "Super Mario", filename: "super-mario.mp3" },
    { label: "Taco Bell", filename: "taco-bell.mp3" },
    { label: "Waluigi", filename: "waluigi.mp3" },
    { label: "Yeet", filename: "yeet.mp3" },
    { label: "You What?", filename: "you-what.mp3" },
    { label: "Toad", filename: "toad.mp3" },
    { label: "Law & Order", filename: "law-and-order.mp3" },
    { label: "Ka-ching", filename: "ka-ching.mp3" },
    { label: "Diagonally", filename: "diagonally.mp3" },
  ];
  sounds = sounds.sort((a, b) => a.label.localeCompare(b.label));

  const [active, setActive] = useState(null);
  const onClick = (sound, idx) => {
    var mp3 = require('../sounds/' + sound);
    new UIfx(
      mp3.default,
      {
        volume: 1.0,
        throttleMs: 0,
      }
    ).play();
    localStorage.setItem("powerHourSound", sound);
    props.setSound(sound);
    setActive(idx);
  };

  const chooseRandom = () => {
    const sound = sounds[Math.floor(Math.random() * sounds.length)].filename;
    localStorage.setItem("powerHourSound", sound);
    props.setSound(sound);
    setActive(-1);
  };

  const getButton = (idx, label, onClick) => {
    return active === idx ?
      <ButtonPrimaryFlexible onClick={onClick} key={idx}>{label}</ButtonPrimaryFlexible> :
      <ButtonFlexible onClick={onClick} key={idx}>{label}</ButtonFlexible>
  };

  const stepNum = Number(props.path.substring(1));

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption="Choose a timer sound effect"
      helpText="You'll drink when you hear this sound"
      path={props.path}
      step={stepNum}
    >
      <ScrollableGrid>
        {getButton(-1, '???', chooseRandom)}
        {sounds.map((sound, idx) => {
          const click = () => onClick(sound.filename, idx);
          return getButton(idx, sound.label, click);
        })}
      </ScrollableGrid>
      <ButtonLink
        to={"/" + (stepNum + 1)}
        text="Next"
        enabled={active !== null ? 1 : 0}
        errorMsg="Click on one of the above sounds"
      />
    </PageTemplate >
  );
};

export default ChooseSound;