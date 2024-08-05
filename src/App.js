// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Buy from './components/buy/Buy';
import Home from './components/home/Home';  // Import the Home component
import BalanceChecker from './components/balanceChecker/BalanceChecker';  // Import the BalanceChecker component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<About />} />  {/* Set About as default route */}
            <Route path="/buy" element={<Buy />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} /> {/* Add About route */}
            <Route path="/balance" element={<BalanceChecker />} /> {/* Add BalanceChecker route */}
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
