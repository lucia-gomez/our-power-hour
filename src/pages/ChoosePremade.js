import { useEffect, useState } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

import Header from '../styles/Header';
import Page from '../styles/Page';
import Table from '../components/Table';
import BackButton from '../components/BackButton';

const Description = styled.p`
  max-width: 500px;
`;

const ChoosePremade = (props) => {
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

  return (
    <Page>
      <BackButton to="/" />
      <Header>Choose a Power Hour</Header>
      <Description>Play a Power Hour created by someone else</Description>
      <br></br>
      <br></br>
      <Table rows={rows} handleSelect={props.useDatabasePowerHour} theme={props.theme} />
    </Page>
  );
};

export default ChoosePremade;