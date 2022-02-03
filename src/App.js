import styled from 'styled-components';
import RootComponent from './components/RootComponent';

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`
function App() {
  return (
      <AppWrapper>
        <RootComponent/>
      </AppWrapper>
  );
}

export default App;


// Calling the RootComponent in this file