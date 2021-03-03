import styled from 'styled-components';
import Page from '../styles/Page';
import Header from '../styles/Header';
import Progress from '../components/Progress';

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

const PageTemplate = (props) => {
  return (
    <StepPage path={props.path}>
      <div>
        <Header className='gradient'>{props.title}</Header>
        {props.caption ? <p>{props.caption}</p> : null}
      </div>
      <StepPageContent>
        {props.children}
      </StepPageContent>
      {props.step > 0 ? Progress(props.step) : null}
    </StepPage >
  );
};

export default PageTemplate;