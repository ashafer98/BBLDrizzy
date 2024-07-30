import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About';
import Buy from './components/buy/Buy';
import Home from './components/home/Home';  // Import the Home component

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<About />} />  {/* Set Home as default route */}
            <Route path="/buy" element={<Buy />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} /> {/* Add About route */}
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
 