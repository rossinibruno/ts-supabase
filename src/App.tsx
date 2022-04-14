import React from 'react';
import Context from './context';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Router />
      </Context>
    </BrowserRouter>
  );
}

export default App;
