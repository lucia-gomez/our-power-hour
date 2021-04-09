import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import Tooltip from '../components/Tooltip';

const StepPage = styled(Page)`
  display: grid;
  grid-template-rows: 200px 1fr 100px;
  overflow: hidden;
`;

const StepPageContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
`;

const Caption = styled.p`
  margin: 0;
  display: inline;
`;

const PageTemplate = (props) => {
  return (
    <StepPage>
      <div>
        <Header className='gradient'>{props.title}</Header>
        {props.caption ? <Caption>{props.caption}</Caption> : null}
        {props.helpText ? <Tooltip text={props.helpText} /> : null}
      </div>
      <StepPageContent>
        {props.children}
      </StepPageContent>
    </StepPage >
  );
};

export default PageTemplate;