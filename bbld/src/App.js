import React from 'react';
import Navbar from './components/NavBar.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Hello World</h1>
      </header>
      <main>
        <p>Scroll down to see the navbar stay at the top.</p>
        <p style={{ height: '200vh' }}>More content...</p>
      </main>
    </div>
  );
}

export default App;
