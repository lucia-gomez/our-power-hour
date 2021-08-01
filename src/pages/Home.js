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

  @media only screen and (max-width: 768px) {
    background-position: center bottom;
    background-size: 100vh;
  }
`;

const Content = styled.div`
  transform: translateY(25%);

  @media only screen and (max-width: 576px) {
    transform: translateY(10%);
  }
`;

const Description = styled.p`
  max-width: 500px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
  }
`;

const Home = (props) => {
  const bgImage = process.env.PUBLIC_URL + '/bottles.png';
  return (
    <HomePage path={props.path} bgImage={bgImage}>
      <Content>
        <Header>Our Power Hour</Header>
        <Description>Create a customized Power Hour experience from any YouTube playlist</Description>
        <br />
        <br />
        <ButtonRow>
          <ButtonLink to="/1" text="Create" enabled={"true"} />
          <ButtonLink to="/browse" text="Pre-made" enabled={"true"} />
        </ButtonRow>
      </Content>
    </HomePage>
  );
};

export default Home;