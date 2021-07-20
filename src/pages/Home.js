import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../styles/Header';
import Page from '../styles/Page';
import ButtonLink from '../components/ButtonLink';
import Table from '../components/Table';
import $ from 'jquery';

const HomePage = styled(Page)`
  background-image: url(${props => props.bgImage});
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center bottom -10vw;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    background-position: center bottom;
    background-size: 100vh;
  }
`;

const Content = styled.div`
  transform: translateY(25%);
`;

const Description = styled.p`
  max-width: 500px;
`;

const Home = (props) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    $.ajax({
      url: "http://localhost:3001/api",
      type: "get",
      success: data => {
        setRows(data)
      },
    });
  }, [])

  const bgImage = process.env.PUBLIC_URL + '/bottles.png';
  return (
    <HomePage path={props.path} bgImage={bgImage}>
      <Content>
        <Header>Our Power Hour</Header>
        <Description>Create a customized Power Hour experience from any YouTube playlist</Description>
        <br />
        <br />
        <ButtonLink to="/1" text="Get started" enabled={"true"} />
      </Content>
      {/* <br />
      <br />
      <p>See what other people are playing</p>
      <Table rows={rows} handleSelect={props.useDatabasePowerHour} /> */}
    </HomePage>
  );
};

export default Home;