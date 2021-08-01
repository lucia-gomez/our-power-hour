import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import Tooltip from '../components/Tooltip';
import BackButton from '../components/BackButton';

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
  const back = props.step === 1 ? "" : props.step - 1;
  return (
    <StepPage>
      <BackButton to={"/" + back} />
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