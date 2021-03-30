import styled from 'styled-components';
import PageTemplate from './PageTemplate';
import ScrollableGrid from '../styles/ScrollableGrid';
import ButtonLink from '../components/ButtonLink';
import themes from '../styles/themes';

const CIRCLE_SIZE = 90;

const ColorScheme = styled.svg`
  cursor: pointer;
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  margin-right: 15px;
`;

const ChooseColor = (props) => {
  const clickTheme = (themeName) => {
    props.setTheme(themeName);
    localStorage.setItem("powerHourTheme", themeName);
  }

  const defineGradient = theme => {
    return (
      <defs>
        <linearGradient id={theme[0] + "Gradient"}>
          <stop stopColor={theme[1].gradientStart} offset="0%" />
          <stop stopColor={theme[1].gradientEnd} offset="100%" />
        </linearGradient>
      </defs>
    );
  }

  const stepNum = Number(props.path.substring(1));

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption="Choose a color scheme (optional)"
      path={props.path}
      step={stepNum}
    >
      <ScrollableGrid>
        {Object.entries(themes).map((theme, i) =>
          <ColorScheme onClick={() => clickTheme(theme[0])} key={i}>
            {defineGradient(theme)}
            <circle cx={CIRCLE_SIZE / 2} cy={CIRCLE_SIZE / 2} r={CIRCLE_SIZE / 2} fill={`url(#${theme[0]}Gradient)`} />
            <circle cx={CIRCLE_SIZE / 2} cy={CIRCLE_SIZE / 2} r={(CIRCLE_SIZE / 2) * 0.8} fill={theme[1].bg} />
          </ColorScheme>
        )}
      </ScrollableGrid>
      <ButtonLink
        enabled={"true"}
        to="/drink"
        text="Next"
      />
    </PageTemplate >
  );
};

export default ChooseColor;