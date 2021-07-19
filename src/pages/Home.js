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
      <div>
        <Header>Our Power Hour</Header>
        <p>Use any YouTube playlist for a customized Power Hour experience</p>
      </div>
      <ButtonLink to="/1" text="Get started" enabled={"true"} />
      <h3>OR</h3>
      <p>Play one of these Power Hours:</p>
      <Table rows={rows} handleSelect={props.useDatabasePowerHour} />
    </HomePage>
  );
};

export default Home;