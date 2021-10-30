import React from 'react';
import './App.css';
import Challenge from './components/Challenge';

const App = () => (
  <main className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center">
    <div className="container-md">
      <div className="row mx-0 justify-content-center">
        <div className="col-sm-9 col-md-7 col-lg-5">
          <Challenge />
        </div>
      </div>
    </div>
  </main>
);

export default App;
