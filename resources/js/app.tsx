import React from 'react';
import ReactDOM from 'react-dom';
import PinInputPage from './pages/pin-input';
import Container from './components/layout/container';

function App() {
  return (
    <Container verticalCenter>
        <PinInputPage />
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));