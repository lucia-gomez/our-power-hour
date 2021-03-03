import styled from 'styled-components';
import Header from '../styles/Header';
import Page from '../styles/Page';
import ButtonLink from '../components/ButtonLink';

const HomePage = styled(Page)`
  background-image: url(${props => props.bgImage});
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center bottom -10vw;
  background-size: contain;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    background-position: center bottom;
    background-size: 100vh;
  }
`;

const Home = (props) => {
  const bgImage = process.env.PUBLIC_URL + '/bottles.png';
  return (
    <HomePage path={props.path} bgImage={bgImage}>
      <div>
        <Header>Our Power Hour</Header>
        <p>Use a Spotify or YouTube playlist for a customized Power Hour experience</p>
      </div>
      <br />
      <ButtonLink to="/1" text="Get started" enabled={"true"} />
    </HomePage>
  );
};

export default Home;